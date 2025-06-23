import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { FetchQuestionCommentsUseCase } from "@/domain/forum/application/useCases/fetch-question-comments";
import { CommentWithAuthorPresenter } from "../presenters/comment-with-author-presenter";

const pageQueryParamsSchema = z.string().optional().default('1').transform(Number).pipe(
    z.number().min(1)
)

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
    constructor( private fetchQuestionComments: FetchQuestionCommentsUseCase ){}

    @Get()
    async handle(@Query('page', queryValidationPipe) page: PageQueryParamsSchema, @Param('questionId') questionId: string) {
      const result = await this.fetchQuestionComments.execute({
        page,
        questionId,
      })

      if(result.isLeft()) {
        throw new BadRequestException()
      }

      const comments = result.value.comments

      return {
        comments: comments.map(CommentWithAuthorPresenter.toHTTP)
      }
    }
}