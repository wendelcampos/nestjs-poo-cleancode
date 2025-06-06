import { Either, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchRecentQuestionsUseCaseRequest {
    page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>

export class FetchRecentQuestionsUseCase {

        constructor( private questionRepository: QuestionsRepository) {}

        async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
           const questions = await this.questionRepository.findByManyRecent({ page })

           return right({ questions })
    }
}