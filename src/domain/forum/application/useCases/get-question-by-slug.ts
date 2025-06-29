import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, left, right } from "@/core/either";
import { QuestionNotFoundError } from "../../../../core/errors/errors/question-not-found-error";
import { Injectable } from "@nestjs/common";
import { QuestionDetails } from "../../enterprise/entities/value-objects/question-details";

interface GetQuestionBySlugUseCaseRequest {
    slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<QuestionNotFoundError, { question: QuestionDetails }>
@Injectable()
export class GetQuestionBySlugUseCase {

        constructor( private questionRepository: QuestionsRepository) {}

        async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
           const question = await this.questionRepository.findDetailsBySlug(slug)

           if(!question) {
                return left(new QuestionNotFoundError())
           }

           return right({ question })
    }
}