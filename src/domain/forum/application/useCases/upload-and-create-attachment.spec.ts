import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments-repository';
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment';
import { FakeUploader } from 'test/storage/fake-uploader';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type-error';

let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let fakeUploader: FakeUploader

let sut: UploadAndCreateAttachmentUseCase

describe('Upload and create attachment', () => {
    beforeEach(() => {
        inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
        fakeUploader = new FakeUploader()
        sut = new UploadAndCreateAttachmentUseCase(inMemoryAttachmentRepository, fakeUploader)
    })

    it('should be able to upload and create an attachment', async () => {
    
        const result = await sut.execute({
            fileName: 'attachment.jpeg',
            fileType: 'image/jpeg',
            body: Buffer.from(''),
        })
    
        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            attachment: inMemoryAttachmentRepository.items[0]
        })
        expect(fakeUploader.uploads).toHaveLength(1)
        expect(fakeUploader.uploads[0]).toEqual(expect.objectContaining({
            fileName: 'attachment.jpeg',
            url: expect.any(String),
        }))
    })
     it('should not be able to upload an attachment with invalid file type', async () => {
    
        const result = await sut.execute({
            fileName: 'attachment.txt',
            fileType: 'text/plain',
            body: Buffer.from(''),
        })
    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
    })
});

