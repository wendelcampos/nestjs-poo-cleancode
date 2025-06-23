import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentRepository()
        inMemoryAnswerRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        inMemoryStudentsRepository = new InMemoryStudentsRepository()
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(inMemoryStudentsRepository)

        sut = new CommentOnAnswerUseCase(
            inMemoryAnswerRepository,
            inMemoryAnswerCommentsRepository
        )
    })

    it('should be able to comment on question', async () => {
        const answer = makeAnswer()

        await inMemoryAnswerRepository.create(answer)
    
        await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: 'New comment'
        })
    
        expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('New comment')
    })
});

