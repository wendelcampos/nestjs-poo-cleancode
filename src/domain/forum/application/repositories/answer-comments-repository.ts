import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-comment";

export abstract class AnswerCommentRepository {
    abstract findById(id: string  ): Promise<AnswerComment | null>
    abstract findManyAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
    abstract create(answerComment: AnswerComment  ): Promise<void>
    abstract delete(answerComment: AnswerComment  ): Promise<void>
}