import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { DomainEvents } from "@/events/domain-events";
import { InMemoryAttachmentRepository } from "./in-memory-attachments-repository";
import { InMemoryStudentsRepository } from "./in-memory-students-repository";
import { InMemoryQuestionAttachmentRepository } from "./in-memory-question-attachment-repository";
import { th } from "@faker-js/faker/.";
import { QuestionDetails } from "@/domain/forum/enterprise/entities/value-objects/question-details";
export class InMemoryQuestionsRepository implements QuestionsRepository {
    public items: Question[] = [];

    constructor(
        private questionAttachmentRepository: InMemoryQuestionAttachmentRepository,
        private attachmentsRepository: InMemoryAttachmentRepository,
        private studentRepository: InMemoryStudentsRepository
    ){}

    async findById(id: string) {
        const question = this.items.find((item) => item.id.toString() === id);

        if (!question) {
            return null
        }

        return question;
    }

    async findBySlug(slug: string) {
        const question = this.items.find((item) => item.slug.value === slug);

        if (!question) {
            return null
        }

        return question;
    }

    
    async findDetailsBySlug(slug: string) {
        const question = this.items.find((item) => item.slug.value === slug);

        if (!question) {
            return null
        }

        const author = this.studentRepository.items.find((student) => {
            return student.id.equals(question.authorId)
        })

        if (!author) {
            throw new Error(`Author with id ${question.authorId.toString()} does not exist`);
        }

        const questionAttachments = await this.questionAttachmentRepository.items.filter((questionAttachments) => {
            return questionAttachments.questionId.equals(question.id)
        })

        const attachments = await questionAttachments.map((questionAttachments) => {
            const attachment = this.attachmentsRepository.items.find((attachment) => {
                return attachment.id.equals(questionAttachments.attachmentId)
            })

            if (!attachment) {
                throw new Error(`Attachment with id ${questionAttachments.attachmentId.toString()} does not exist`);
            }

            return attachment;
        })

        return QuestionDetails.create({
            questionId: question.id,
            authorId: question.authorId,
            author: author.name,
            title: question.title,
            slug: question.slug.value,
            content: question.content,
            bestAnswerId: question.bestAnswerId,
            createdAt: question.createAt,
            updatedAt: question.updateAt,
            attachments
        });
    }

    async findByManyRecent({ page }: PaginationParams) {
        const questions = this.items
            .sort((a, b) => b.createAt.getTime() - a.createAt.getTime())
            .slice((page - 1) * 20, page * 20);

        return questions;
    }

    async create(question: Question) {
        this.items.push(question);

        await this.questionAttachmentRepository.createMany(
            question.attachments.getItems()
        )

        DomainEvents.dispatchEventsForAggregate(question.id)
    }

    async save(question: Question){
        const itemIndex = this.items.findIndex((item) => item.id === question.id);

        this.items[itemIndex] = question;

        await this.questionAttachmentRepository.createMany(
            question.attachments.getNewItems()
        )

        await this.questionAttachmentRepository.deleteMany(
            question.attachments.getRemovedItems()
        )

        DomainEvents.dispatchEventsForAggregate(question.id)

    }

   async delete(question: Question){
        const itemIndex = this.items.findIndex((item) => item.id === question.id);

        this.items.splice(itemIndex, 1);

        this.questionAttachmentRepository.deleteManyByQuestionId(question.id.toString())
    }
}