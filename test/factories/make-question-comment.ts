import { faker } from '@faker-js/faker';

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-question-comment-mapper';

export function makeQuestionComment(override: Partial<QuestionCommentProps> = {}, id? : UniqueEntityID) {
    const questionComment =  QuestionComment.create({
        authorId: new UniqueEntityID('1'),
        questionId: new UniqueEntityID('1'),
        content: faker.lorem.text(),
        ...override
    }, id)
    
    return questionComment
}

@Injectable()
export class QuestionCommentFactory {
    constructor(private prisma: PrismaService) {}

    async makePrismaQuestionComment(data: Partial<QuestionCommentProps> = {}): Promise<QuestionComment> {
        const questionComment = makeQuestionComment(data)

        await this.prisma.comment.create({
            data: PrismaQuestionCommentMapper.toPrisma(questionComment)
        })

        return questionComment
    }
}