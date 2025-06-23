import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository';
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { makeStudent } from 'test/factories/make-student';

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswersCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Answers', () => {
    beforeEach(() => {
        inMemoryStudentsRepository = new InMemoryStudentsRepository()
        inMemoryAnswersCommentsRepository = new InMemoryAnswerCommentsRepository(inMemoryStudentsRepository)
        sut = new FetchAnswerCommentsUseCase(inMemoryAnswersCommentsRepository)
    })

    it('should be able to fetch question answers', async () => {

        const student = await makeStudent({ name: 'John Doe' })

        await inMemoryStudentsRepository.items.push(student)

        const comment1 = makeAnswerComment({ answerId: new UniqueEntityID('question-1'), authorId: student.id })
        const comment2 = makeAnswerComment({ answerId: new UniqueEntityID('question-1'), authorId: student.id })
        const comment3 = makeAnswerComment({ answerId: new UniqueEntityID('question-1'), authorId: student.id })
        
        await inMemoryAnswersCommentsRepository.create( comment1 )
        await inMemoryAnswersCommentsRepository.create( comment2 )
        await inMemoryAnswersCommentsRepository.create( comment3 )

        const result = await sut.execute({
            answerId: 'question-1',
            page: 1,
        })

        expect(result.value?.comments).toHaveLength(3)
         expect(result.value?.comments).toEqual(expect.arrayContaining([
           expect.objectContaining({
                author: 'John Doe',
                commentId: comment1.id,
           }),
            expect.objectContaining({
                author: 'John Doe',
                commentId: comment2.id,
           }),
            expect.objectContaining({
                author: 'John Doe',
                commentId: comment3.id,
           })  
        ]))
    });
    
    it('should be able to fetch paginated question answers', async () => {
        const student = await makeStudent()

        await inMemoryStudentsRepository.items.push(student)

        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersCommentsRepository.create(makeAnswerComment({
                answerId: new UniqueEntityID('question-1'),
                authorId: student.id,
            }))
        }

        const result = await sut.execute({
            answerId: 'question-1',
            page: 2,
        })

       expect(result.value?.comments).toHaveLength(2)
    });

})