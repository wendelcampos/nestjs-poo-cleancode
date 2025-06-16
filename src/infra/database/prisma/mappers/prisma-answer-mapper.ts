import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Answer as PrismaAnswer, Prisma } from "@prisma/client";

export class PrismaAnswerMapper {
    static toDomain(raw: PrismaAnswer): Answer {
        return Answer.create({
            content: raw.content,
            questionId: new UniqueEntityID(raw.questionId),
            authorId: new UniqueEntityID(raw.authorId),
            createAt: raw.createdAt,
            updateAt: raw.updatedAt,
        }, 
        new UniqueEntityID(raw.id))
    }

    static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
        return {
            id: answer.id.toString(),
            content: answer.content,
            authorId: answer.authorId.toString(),
            questionId: answer.questionId.toString(),
            createdAt: answer.createAt,
            updatedAt: answer.updateAt,
        }
    }   
}