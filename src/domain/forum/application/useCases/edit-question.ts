import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionNotFoundError } from "../../../../core/errors/errors/question-not-found-error";
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error";
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Injectable } from "@nestjs/common";
interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string; 
    title: string;
    content: string;
    attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<QuestionNotFoundError | NotAllowedError, { question: Question }>

@Injectable()
export class EditQuestionUseCase {

    constructor( 
        private questionRepository: QuestionsRepository,
        private questionAttachmentsRepository: QuestionAttachmentsRepository
    ) {}

    async execute({ authorId, questionId, title, content, attachmentsIds }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new QuestionNotFoundError())
        }

        if(authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyQuestionId(questionId)
        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

        const questionAttachments = attachmentsIds.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                questionId: question.id
            })
        })

        questionAttachmentList.update(questionAttachments)

        question.attachments = questionAttachmentList
        question.title = title
        question.content = content
        

        await this.questionRepository.save(question)

        return right({ question })
    }
}