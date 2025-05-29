import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionsRespository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaQuestionCommentsRespository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaQuestionAttachmentsRespository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";

@Module({
    providers: [
        PrismaService,
        PrismaQuestionsRespository,
        PrismaQuestionCommentsRespository,
        PrismaQuestionAttachmentsRespository,
        PrismaAnswersRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository
    ],
    exports: [
        PrismaService,
        PrismaQuestionsRespository,
        PrismaQuestionCommentsRespository,
        PrismaQuestionAttachmentsRespository,
        PrismaAnswersRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository
    ]
})
export class DatabaseModule {}