import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { DomainEvents } from "@/events/domain-events";

export class InMemoryStudentsRepository implements StudentsRepository {
    public items: Student[] = [];

    async findByEmail(email: string) {
        const student= this.items.find((item) => item.email === email);

        if (!student) {
            return null
        }

        return student;
    }

    async create(student: Student) {
        this.items.push(student);

        DomainEvents.dispatchEventsForAggregate(student.id)
    }
}