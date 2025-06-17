import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/useCases/fetch-question-answers";
import { AnswerPresenter } from "../presenters/answer-presenter";

const pageQueryParamsSchema = z.string().optional().default('1').transform(Number).pipe(
    z.number().min(1)
)

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
    constructor( private fetchQuestionAnswers: FetchQuestionAnswersUseCase ){}

    @Get()
    async handle(@Query('page', queryValidationPipe) page: PageQueryParamsSchema, @Param('questionId') questionId: string) {
      const result = await this.fetchQuestionAnswers.execute({
        page,
        questionId,
      })

      if(result.isLeft()) {
        throw new BadRequestException()
      }

      const answers = result.value.answers

      return {
        answers: answers.map(AnswerPresenter.toHTTP)
      }
    }
}