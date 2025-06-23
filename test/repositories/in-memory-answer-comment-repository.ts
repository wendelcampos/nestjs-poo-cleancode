import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { InMemoryStudentsRepository } from "./in-memory-students-repository";
import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";
export class InMemoryAnswerCommentsRepository implements AnswerCommentRepository {
    public items: AnswerComment[] = [];

    constructor(private studentsRepository: InMemoryStudentsRepository) {}

    async findById(id: string) {
        const answerComment = this.items.find((item) => item.id.toString() === id);

        if (!answerComment) {
            return null
        }

        return answerComment;
    }

    async findManyAnswerId(answerId: string, { page }: PaginationParams) {
        const answerComments = this.items
            .filter((item) => item.answerId.toString() === answerId)
            .slice((page - 1) * 20, page * 20);

        return answerComments;
    }

     async findManyByAnswerIdWithAuthor(answerId: string, { page }: PaginationParams) {
            
            const answerComment = this.items
                .filter((item) => item.answerId.toString() === answerId)
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
    
            return answerComment;
        }

    async create(answerComment: AnswerComment) {
        this.items.push(answerComment);
    }

    async delete(answerComment: AnswerComment): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === answerComment.id);

        if (itemIndex >= 0) {
            this.items.splice(itemIndex, 1);
        }
    }

}