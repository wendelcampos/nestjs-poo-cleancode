import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachment-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachment-repository"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../use-cases/send-notification"
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository"
import { makeQuestion } from "test/factories/make-question"
import { MockInstance } from "vitest"
import { waitFor } from "test/utils/wait-for"
import { OnQuestionBestAnswerChosen } from "./on-question-best-aswer-chosen"
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository"
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachments-repository"

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationRepository: InMemoryNotificationsRepository
let inMemoryStudentRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
 ({
    ...args
  }: SendNotificationUseCaseRequest) => Promise<SendNotificationUseCaseResponse>
>

describe('On Question Best Answer Chosen', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryAttachmentsRepository = new InMemoryAttachmentRepository()
        inMemoryStudentRepository = new InMemoryStudentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentRepository, inMemoryAttachmentsRepository, inMemoryStudentRepository)
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentRepository)
        inMemoryNotificationRepository = new InMemoryNotificationsRepository()
        sendNotificationUseCase = new SendNotificationUseCase(
            inMemoryNotificationRepository
        )

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

        new OnQuestionBestAnswerChosen(
            inMemoryAnswersRepository,
            sendNotificationUseCase
        )
    })
    it('should send a notification when question has new best answer chosen', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({ questionId: question.id})

        inMemoryQuestionsRepository.create(question)
        inMemoryAnswersRepository.create(answer)

        question.bestAnswerId = answer.id

        inMemoryQuestionsRepository.save(question)

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
        })
    })
})