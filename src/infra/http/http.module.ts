import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { CreateQuestionUseCase } from "@/domain/forum/application/useCases/create-question";
import { DatabaseModule } from "../database/database.module";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/useCases/fetch-recent-questions";
import { RegisterStudentUseCase } from "@/domain/forum/application/useCases/register-student";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/useCases/authenticate-student";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { GetQuestionBySlugController } from "./controllers/get-question-by-slug.controller";
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/useCases/get-question-by-slug";
import { EditQuestionController } from "./controllers/edit-question.controller";
import { EditQuestionUseCase } from "@/domain/forum/application/useCases/edit-question";
import { DeleteQuestionController } from "./controllers/delete-question.controller";
import { DeleteQuestionUseCase } from "@/domain/forum/application/useCases/delete-question";
import { AnswerQuestionController } from "./controllers/answer-question.controller";
import { AnswerQuestionUseCase } from "@/domain/forum/application/useCases/answer-question";
import { EditAnswerController } from "./controllers/edit-answer.controller";
import { EditAnswerUseCase } from "@/domain/forum/application/useCases/edit-answer";
import { DeleteAnswerController } from "./controllers/delete-answer.controller";
import { DeleteAnswerUseCase } from "@/domain/forum/application/useCases/delete-answer";
import { FetchQuestionAnswersController } from "./controllers/fetch-question-answers.controller";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/useCases/fetch-question-answers";
import { ChooseQuestionBestAnswerController } from "./controllers/choose-question-best-answer.controller";
import { ChooseQuestionBestAnswerUseCase } from "@/domain/forum/application/useCases/choose-question-best-answer";
import { CommentOnQuestionController } from "./controllers/comment-on-question.controller";
import { CommentOnQuestionUseCase } from "@/domain/forum/application/useCases/comment-on-question";
import { DeleteQuestionCommentController } from "./controllers/delete-question-comment.controller";
import { DeleteQuestionCommentUseCase } from "@/domain/forum/application/useCases/delete-question-comment";
import { CommentOnAnswerController } from "./controllers/comment-on-answer.controller";
import { CommentOnAnswerUseCase } from "@/domain/forum/application/useCases/comment-on-answer";
import { DeleteAnswerCommentController } from "./controllers/delete-answer-comment.controller";
import { DeleteAnswerCommentUseCase } from "@/domain/forum/application/useCases/delete-answer-comment";
import { FetchQuestionCommentsController } from "./controllers/fetch-question-comments.controller";
import { FetchQuestionCommentsUseCase } from "@/domain/forum/application/useCases/fetch-question-comments";
import { FetchAnswerCommentsController } from "./controllers/fetch-answer-comments.controller";
import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/useCases/fetch-answer-comments";
import { UploadAttachmentController } from "./controllers/upload-attachment.controller";
import { StorageModule } from "../storage/storage.module";
import { UploadAndCreateAttachmentUseCase } from "@/domain/forum/application/useCases/upload-and-create-attachment";
import { ReadNotificationController } from "./controllers/read-notification.controller";
import { ReadNotificationUseCase } from "@/domain/notification/application/use-cases/read-notification";

@Module({
    imports: [DatabaseModule, CryptographyModule, StorageModule],
    controllers: [
        CreateAccountController, 
        AuthenticateController, 
        CreateQuestionController, 
        FetchRecentQuestionsController, 
        GetQuestionBySlugController, 
        EditQuestionController, 
        DeleteQuestionController, 
        AnswerQuestionController,
        EditAnswerController,
        DeleteAnswerController,
        FetchQuestionAnswersController,
        ChooseQuestionBestAnswerController,
        CommentOnQuestionController,
        DeleteQuestionCommentController,
        CommentOnAnswerController,
        DeleteAnswerCommentController,
        FetchQuestionCommentsController,
        FetchAnswerCommentsController,
        UploadAttachmentController,
        ReadNotificationController
    ],
    providers: [
        CreateQuestionUseCase, 
        FetchRecentQuestionsUseCase, 
        RegisterStudentUseCase, 
        AuthenticateStudentUseCase, 
        GetQuestionBySlugUseCase, 
        EditQuestionUseCase, 
        DeleteQuestionUseCase, 
        AnswerQuestionUseCase,
        EditAnswerUseCase,
        DeleteAnswerUseCase,
        FetchQuestionAnswersUseCase,
        ChooseQuestionBestAnswerUseCase,
        CommentOnQuestionUseCase,
        DeleteQuestionCommentUseCase,
        CommentOnAnswerUseCase,
        DeleteAnswerCommentUseCase,
        FetchQuestionCommentsUseCase,
        FetchAnswerCommentsUseCase,
        UploadAndCreateAttachmentUseCase,
        ReadNotificationUseCase
    ],
})


export class HttpModule {}