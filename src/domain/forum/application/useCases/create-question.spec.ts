import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository';
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryAttachmentsRepository = new InMemoryAttachmentRepository()
        inMemoryStudentsRepository = new InMemoryStudentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository, inMemoryAttachmentsRepository, inMemoryStudentsRepository)
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to create a question', async () => {
    
        const result = await sut.execute({
            authorId: '1',
            title: 'New Question',
            content: 'New Content',
            attachmentsIds: ['1', '2'],
        })
    
        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
        ])
    })

    it('should persist attachments when creating a new question', async () => {
    
        const result = await sut.execute({
            authorId: '1',
            title: 'New Question',
            content: 'New Content',
            attachmentsIds: ['1', '2'],
        })
    
        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(2)
        expect(inMemoryQuestionAttachmentsRepository.items).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
        ])
    })
});

