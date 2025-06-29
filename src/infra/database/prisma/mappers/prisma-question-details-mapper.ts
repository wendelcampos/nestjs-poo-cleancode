 import { Question as PrismaQuestion, User as PrismaUser, Attachment as PrismaAttachment } from "@prisma/client";
import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionDetails } from "@/domain/forum/enterprise/entities/value-objects/question-details";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { PrismaAttachmentMapper } from "./prisma-attachment-mapper";

type PrismaQuestionDetails = PrismaQuestion & {
    author: PrismaUser;
    attachments: PrismaAttachment[];
}

export class PrismaQuestionDetailsMapper {
    static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
        return QuestionDetails.create({
            questionId: new UniqueEntityID(raw.id),
            authorId: new UniqueEntityID(raw.authorId),
            author: raw.author.name,
            title: raw.title,
            slug: Slug.create(raw.slug).value,
            attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
            bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.bestAnswerId) : null,
            content: raw.content,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        })
    }
}