import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({
    required: true,
    type: Types.ObjectId,
    unique: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '댓글의 좋아요 수',
    required: true,
  })
  @Prop({
    default: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상(게시물, 정보글)',
    required: true,
  })
  @Prop({
    required: true,
    type: Types.ObjectId,
    unique: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
