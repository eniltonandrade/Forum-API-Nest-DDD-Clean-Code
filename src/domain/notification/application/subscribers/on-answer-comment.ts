import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerCommentEvent } from '@/domain/forum/enterprise/events/answer-comment-event'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

export class OnAnswerComment implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendCommentOnAnswerNotification.bind(this),
      AnswerCommentEvent.name,
    )
  }

  private async sendCommentOnAnswerNotification({
    answerComment,
  }: AnswerCommentEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Você tem uma nova comentário!`,
        content: `Um novo comentário foi feito em "${answer.content
          .substring(0, 20)
          .concat('...')}"`,
      })
    }
  }
}
