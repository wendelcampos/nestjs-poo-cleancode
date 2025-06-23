import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { InMemoryStudentsRepository } from "./in-memory-students-repository";
import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";

export class InMemoryQuestionCommentsRepository implements QuestionsCommentRepository {
    public items: QuestionComment[] = [];

    constructor ( private studentsRepository: InMemoryStudentsRepository ) {}

    async findById(id: string) {
            const questionComment = this.items.find((item) => item.id.toString() === id);
    
            if (!questionComment) {
                return null
            }
    
            return questionComment;
    }

    async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
        const questionComment = this.items
            .filter((item) => item.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20);

        return questionComment;
    }

    async findManyByQuestionIdWithAuthor(questionId: string, { page }: PaginationParams) {
        
        const questionComment = this.items
            .filter((item) => item.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20)
            .map((comment) => {

                const author = this.studentsRepository.items.find((student) => {
                    return student.id.equals(comment.authorId);
                });

                if (!author) {
                    throw new Error(`Author not found for comment with ID ${comment.id.toString()}`);
                }

                return CommentWithAuthor.create({
                    commentId: comment.id,
                    content: comment.content,
                    createdAt: comment.createAt,
                    updatedAt: comment.updateAt ?? null,
                    authorId: comment.authorId,
                    author: author.name,
    
                })
            })

        return questionComment;
    }

    async delete(questionComment: QuestionComment): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === questionComment.id);

        if (itemIndex >= 0) {
            this.items.splice(itemIndex, 1);
        }
    }

    async create(questionComment: QuestionComment) {
        this.items.push(questionComment);
    }

  
}