import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
    beforeEach(() => {
        inMemoryAttachmentsRepository = new InMemoryAttachmentRepository()
        inMemoryStudentsRepository = new InMemoryStudentsRepository()
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository, inMemoryAttachmentsRepository, inMemoryStudentsRepository)
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository)
    })

    it('should be able to edit a question', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))

        await inMemoryQuestionsRepository.create(newQuestion)

        inMemoryQuestionAttachmentsRepository.items.push(
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityID('1')
            }),
               makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityID('2')
            })
        )
    
        await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: 'author-1',
            title: 'New title',
            content: 'New content',
            attachmentsIds: ['1', '3']
        })
    
        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'New title',
            content: 'New content'
        })
        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
        ])
    })

    it('should not be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))

        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
                questionId: newQuestion.id.toString(),
                authorId: 'author-2',
                title: 'New title',
                content: 'New content',
                attachmentsIds: []
            })
    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })

    it('should sync new and removed attachments when editing a question', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))

        await inMemoryQuestionsRepository.create(newQuestion)

        inMemoryQuestionAttachmentsRepository.items.push(
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityID('1')
            }),
               makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityID('2')
            })
        )
    
        const result = await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: 'author-1',
            title: 'New title',
            content: 'New content',
            attachmentsIds: ['1', '3']
        })
        
        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(2)
        expect(inMemoryQuestionAttachmentsRepository.items).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
        ])
    })
});

