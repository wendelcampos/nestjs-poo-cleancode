import { InvalidAttachmentTypeError } from "@/domain/forum/application/useCases/errors/invalid-attachment-type-error";
import { UploadAndCreateAttachmentUseCase } from "@/domain/forum/application/useCases/upload-and-create-attachment";
import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('/attachments')
export class UploadAttachmentController {
    constructor(private uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase ){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async handle(@UploadedFile(
        new ParseFilePipe({
            validators: [
            new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
            new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
            ],
        }),
    ) file: Express.Multer.File) {
        const result = await this.uploadAndCreateAttachment.execute({
            fileName: file.originalname,
            fileType: file.mimetype,
            body: file.buffer,
        })

        if(result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case InvalidAttachmentTypeError:
                    throw new BadRequestException(error.message)
                default:
                    throw new BadRequestException(error.message)
            }
        }

        const { attachment } = result.value

        return {
            attachment: attachment.id.toString(),
        }
    }
}