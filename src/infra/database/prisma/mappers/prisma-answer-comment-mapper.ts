import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { Comment as PrismaComment, Prisma } from "@prisma/client";

export class PrismaAnswerCommentMapper {
    static toDomain(raw: PrismaComment): AnswerComment {

        if (!raw.answerId) {
            throw new Error("Invalid comment type");
        }

        return AnswerComment.create({
            content: raw.content,
            authorId: new UniqueEntityID(raw.authorId),
            answerId: new UniqueEntityID(raw.answerId),
            createAt: raw.createdAt,
            updateAt: raw.updatedAt,
        }, 
        new UniqueEntityID(raw.id))
    }

    static toPrisma(answerComment: AnswerComment): Prisma.CommentUncheckedCreateInput {
        return {
            id: answerComment.id.toString(),
            authorId: answerComment.authorId.toString(),
            answerId: answerComment.answerId.toString(),
            content: answerComment.content,
            createdAt: answerComment.createAt,
            updatedAt: answerComment.updateAt,
        }
    }   
}