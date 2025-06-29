import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionNotFoundError } from "../../../../core/errors/errors/question-not-found-error";
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error";
import { Injectable } from "@nestjs/common";

interface DeleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<QuestionNotFoundError | NotAllowedError, null>

@Injectable()
export class DeleteQuestionUseCase {

    constructor( private questionRepository: QuestionsRepository) {}

    async execute({ authorId, questionId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new QuestionNotFoundError())
        }

        if(authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        await this.questionRepository.delete(question)

        return right(null)
    }
}