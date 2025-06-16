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

@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [CreateAccountController, AuthenticateController, CreateQuestionController, FetchRecentQuestionsController, GetQuestionBySlugController, EditQuestionController, DeleteQuestionController],
    providers: [CreateQuestionUseCase, FetchRecentQuestionsUseCase, RegisterStudentUseCase, AuthenticateStudentUseCase, GetQuestionBySlugUseCase, EditQuestionUseCase, DeleteQuestionUseCase],
})


export class HttpModule {}