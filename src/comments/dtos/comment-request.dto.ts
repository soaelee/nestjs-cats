import { PickType } from '@nestjs/swagger';
import { Comment } from '../comments.schema';
export class CommentRequestDto extends PickType(Comment, ['description']) {}
