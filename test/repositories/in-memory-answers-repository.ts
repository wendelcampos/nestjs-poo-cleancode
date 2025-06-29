import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { DomainEvents } from "@/events/domain-events";
export class InMemoryAnswersRepository implements AnswersRepository {
    public items: Answer[] = [];

     constructor(
        private answerAttachmentRepository: AnswerAttachmentsRepository,
    ){}

    async findById(id: string) {
        const answer = this.items.find((item) => item.id.toString() === id);

        if (!answer) {
            return null
        }

        return answer;
    }

    async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
        const answers = this.items
            .filter((item) => item.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20);

        return answers;
    }

    async create(answer: Answer) {
        this.items.push(answer);

        await this.answerAttachmentRepository.createMany(
            answer.attachments.getItems()
        )

        DomainEvents.dispatchEventsForAggregate(answer.id)
    }

    async save(answer: Answer){
        const itemIndex = this.items.findIndex((item) => item.id === answer.id);

        this.items[itemIndex] = answer;

        await this.answerAttachmentRepository.createMany(
            answer.attachments.getNewItems()
        )

        await this.answerAttachmentRepository.deleteMany(
            answer.attachments.getRemovedItems()
        )

        DomainEvents.dispatchEventsForAggregate(answer.id)

    }

    async delete(answer: Answer) {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id);
        
        this.items.splice(itemIndex, 1);

        this.answerAttachmentRepository.deleteManyByAnswerId(answer.id.toString())

    }
}