import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export abstract class QuestionsCommentRepository {
    abstract findById(id: string): Promise<QuestionComment | null>
    abstract findManyQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
    abstract create(questionComment: QuestionComment): Promise<void>
    abstract delete(questionComment: QuestionComment): Promise<void>
}