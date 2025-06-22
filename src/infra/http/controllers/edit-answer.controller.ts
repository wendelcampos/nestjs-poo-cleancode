import { BadRequestException, Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import z from "zod";
import { EditAnswerUseCase } from "@/domain/forum/application/useCases/edit-answer";

const editAnswerBodySchema = z.object({
    content: z.string(),
    attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema);

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>;

@Controller('/answers/:id')
export class EditAnswerController {
    constructor( private editAnswer: EditAnswerUseCase ){}

    @Put()
    @HttpCode(204)
    async handle(@Body(bodyValidationPipe) body: EditAnswerBodySchema, @CurrentUser() user: UserPayload, @Param('id') answerId: string ) {
        const { content, attachments } = body;
        const { sub: userId } = user

        const result = await this.editAnswer.execute({
            authorId: userId,
            answerId,
            content,
            attachmentsIds: attachments,
        })

        if(result.isLeft()) {
            throw new BadRequestException()
        }
    }
}