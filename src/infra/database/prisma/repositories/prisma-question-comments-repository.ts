import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaQuestionCommentsRespository implements QuestionsCommentRepository {

    findById(id: string): Promise<QuestionComment | null> {
        throw new Error("Method not implemented.");
    }

    findManyQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]> {
        throw new Error("Method not implemented.");
    }

    create(questionComment: QuestionComment): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(questionComment: QuestionComment): Promise<void> {
        throw new Error("Method not implemented.");
    }
}