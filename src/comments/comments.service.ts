import { CatsRepository } from './../cats/cats.repository';
import { InjectModel } from '@nestjs/mongoose';
import { CommentRequestDto } from './dtos/comment-request.dto';
import { Cat } from './../cats/cats.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment } from './comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments(): Promise<Comment[]> {
    try {
      const comments = await this.commentModel.find();
      return comments;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createComment(
    cat: Cat,
    id: string,
    commentRequestDto: CommentRequestDto,
  ): Promise<Comment> {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(cat._id);
      const newComment = new this.commentModel({
        author: validatedAuthor._id,
        contents: commentRequestDto.contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async plusLike(id: string): Promise<Comment> {
    try {
      const comment = await this.commentModel.findById(id);
      console.log(comment);
      comment.likeCount += 1;
      return await comment.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
