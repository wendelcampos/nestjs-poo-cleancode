import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from 'supertest';

describe('Fetch recent questions (E2E)', () => {
    let app: INestApplication;
    let prisma: PrismaService
    let jwt: JwtService
    
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
        .compile();

        app = moduleRef.createNestApplication()

        prisma = moduleRef.get(PrismaService);
        jwt = moduleRef.get(JwtService);

        await app.init();
    });

    test('[GET] /questions', async () => {
        const user = await prisma.user.create({
        data: {
                name: 'John Doe',
                email: 'jonhdoe@example.com',
                password: '123456',
            }
        })

        const accessToken = await jwt.sign({ sub: user.id });

        await prisma.question.createMany({
            data: [
                {
                    title: 'Question 01',
                    slug: 'question-01',
                    content: 'Content of the first question',
                    authorId: user.id,
                },
                {
                    title: 'Question 02',
                    slug: 'question-02',
                    content: 'Content of the first question',
                    authorId: user.id,
                }
            ]
        })
                
       const response = await request(app.getHttpServer())
            .get('/questions')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            questions: [
                expect.objectContaining({ title: 'Question 01' }),
                expect.objectContaining({ title: 'Question 02' }),
            ]
        })
    })
})