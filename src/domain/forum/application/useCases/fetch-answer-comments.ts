import { Either, right } from "@/core/either";
import { AnswerCommentRepository } from "../repositories/answer-comments-repository";
import { Injectable } from "@nestjs/common";
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author";

interface FetchAnswerCommentsUseCaseRequest {
    answerId: string
    page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<null, { comments: CommentWithAuthor[] }>

@Injectable()
export class FetchAnswerCommentsUseCase {

        constructor( private answerCommentRepository: AnswerCommentRepository) {}

        async execute({ page, answerId }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
           const comments = await this.answerCommentRepository.findManyByAnswerIdWithAuthor(answerId, { page })

           return right({ comments })
    }
}