import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository';
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryAttachmentsRepository = new InMemoryAttachmentRepository()
        inMemoryStudentsRepository = new InMemoryStudentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository, inMemoryAttachmentsRepository, inMemoryStudentsRepository)
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(inMemoryStudentsRepository)

        sut = new CommentOnQuestionUseCase(
            inMemoryQuestionsRepository,
            inMemoryQuestionCommentsRepository
        )
    })

    it('should be able to comment on question', async () => {
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)
    
        await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: 'New comment'
        })
    
        expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual('New comment')
    })
});

