import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentsRepository {
    
    public items: QuestionAttachment[] = [];

    async findManyQuestionId(questionId: string) {
        const questionAttachments = this.items.filter((item) => item.questionId.toString() === questionId)

        return questionAttachments;
    }

    async deleteManyByQuestionId(questionId: string): Promise<void> {
        const questionAttachments = this.items.filter((item) => item.questionId.toString() != questionId)

        this.items = questionAttachments;
    }
}