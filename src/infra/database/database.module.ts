import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionsRespository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaQuestionCommentsRespository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaQuestionAttachmentsRespository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { PrismaStudentsRespository } from "./prisma/repositories/prisma-students-repository";
import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AttachmentsRepository } from "@/domain/forum/application/repositories/attachments-repository";
import { PrismaAttachmentsRespository } from "./prisma/repositories/prisma-attachments-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: QuestionsRepository,
            useClass: PrismaQuestionsRespository
        },
        {
            provide: StudentsRepository,
            useClass: PrismaStudentsRespository
        },
        {
            provide: QuestionsCommentRepository,
            useClass: PrismaQuestionCommentsRespository,
        },
        {
            provide: QuestionAttachmentsRepository,
            useClass: PrismaQuestionAttachmentsRespository,
        },
        {
            provide: AnswersRepository,
            useClass: PrismaAnswersRepository,
        },
        {
            provide: AnswerCommentRepository,
            useClass: PrismaAnswerCommentsRepository,
        },
        {
            provide: AnswerAttachmentsRepository,
            useClass: PrismaAnswerAttachmentsRepository
        },
        {
            provide: AttachmentsRepository,
            useClass: PrismaAttachmentsRespository
        }
    ],
    exports: [
        PrismaService,
        QuestionsRepository,
        StudentsRepository,
        QuestionsCommentRepository,
        QuestionAttachmentsRepository,
        AnswersRepository,
        AnswerCommentRepository,
        AnswerAttachmentsRepository,
        AttachmentsRepository
    ]
})
export class DatabaseModule {}