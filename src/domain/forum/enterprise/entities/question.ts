import { AggregateRoot } from "@/core/entities/aggregate-root"
import { Slug } from "./value-objects/slug"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import { QuestionAttachmentList } from "./question-attachment-list"

import dayjs from 'dayjs'
import { QuestionBestAnswerChosenEvent } from "../events/question-best-answer-chosen-event"
export interface QuestionProps {
    authorId: UniqueEntityID
    bestAnswerId?: UniqueEntityID | null
    title: string
    content: string
    slug: Slug
    attachments: QuestionAttachmentList
    createAt: Date
    updateAt?: Date | null
}

export class Question extends AggregateRoot<QuestionProps> {
    get authorId() {
        return this.props.authorId
    }

    get bestAnswerId() {
        return this.props.bestAnswerId
    }

    set bestAnswerId(bestAnswerId: UniqueEntityID | undefined | null) {
        if(bestAnswerId && bestAnswerId !== this.props.bestAnswerId) {
            this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
        }

        this.props.bestAnswerId = bestAnswerId
        
        this.touch()
    }

    get title() {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = Slug.createFromText(title)

        this.touch()
    }

    get content() {
        return this.props.content
    }

    set content(content: string) {
        this.props.content = content

        this.touch()
    }

    get slug() {
        return this.props.slug
    }

    get attachments() {
        return this.props.attachments
    }

    set attachments(attachments: QuestionAttachmentList) {
        this.props.attachments = attachments
        this.touch()
    }

    get createAt() {
        return this.props.createAt
    }

    get updateAt() {
        return this.props.updateAt
    }

    get isNew(): boolean {
        return dayjs().diff(this.createAt, 'days') <= 3
    }

    get excerpt() {
        return this.content
            .substring(0, 120)
            .trimEnd()
            .concat('...')
    }

    private touch() {
        this.props.updateAt = new Date()
    }

    static create(props: Optional<QuestionProps, 'createAt' | 'slug' | 'attachments'>, id?: UniqueEntityID) {
        const question = new Question({ 
            ...props, 
            slug: props.slug ?? Slug.createFromText(props.title),
            attachments: props.attachments ?? new QuestionAttachmentList(),
            createAt: props.createAt ?? new Date()
        }, id)

        return question
    }
}