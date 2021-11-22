import { CommentRequestDto } from './dtos/comment-request.dto';
import { Cat } from './../cats/cats.schema';
import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getAllComments(): Promise<string> {
    return 'comments';
  }

  async createComment(
    cat: Cat,
    id: string,
    body: CommentRequestDto,
  ): Promise<string> {
    return 'success';
  }
}
