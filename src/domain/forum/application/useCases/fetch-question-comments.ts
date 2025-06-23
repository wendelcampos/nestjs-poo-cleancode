import { Either, right } from "@/core/either";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionsCommentRepository } from "../repositories/question-comments-repository";
import { Injectable } from "@nestjs/common";
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author";

interface FetchQuestionCommentsUseCaseRequest {
    questionId: string
    page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<null, { comments: CommentWithAuthor[] }>

@Injectable()
export class FetchQuestionCommentsUseCase {

        constructor( private questionCommentRepository: QuestionsCommentRepository) {}

        async execute({ page, questionId }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
           const comments = await this.questionCommentRepository.findManyByQuestionIdWithAuthor(questionId, { page })

           return right({ comments })
    }
}