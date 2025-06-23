import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author";

export abstract class AnswerCommentRepository {
    abstract findById(id: string  ): Promise<AnswerComment | null>
    abstract findManyAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
    abstract findManyByAnswerIdWithAuthor(questionId: string, params: PaginationParams): Promise<CommentWithAuthor[]>
    abstract create(answerComment: AnswerComment  ): Promise<void>
    abstract delete(answerComment: AnswerComment  ): Promise<void>
}