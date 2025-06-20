import { BadRequestException, Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { DeleteAnswerCommentUseCase } from "@/domain/forum/application/useCases/delete-answer-comment";

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
    constructor( private deleteAnswerComment: DeleteAnswerCommentUseCase ){}

    @Delete()
    @HttpCode(204)
    async handle(@CurrentUser() user: UserPayload, @Param('id') answerCommentId: string ) {
        const { sub: userId } = user

        const result = await this.deleteAnswerComment.execute({
            answerCommentId,
            authorId: userId,
        })

        if(result.isLeft()) {
            throw new BadRequestException()
        }
    }
}