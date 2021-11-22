import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Cat } from 'src/cats/cats.schema';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CommentsService } from './comments.service';
import { CommentRequestDto } from './dtos/comment-request.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 남기기' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  createComment(
    @CurrentUser() cat: Cat,
    @Param('id') id: string,
    @Body() body: CommentRequestDto,
  ) {
    console.log(cat);
    return this.commentsService.createComment(cat, id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기' })
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  plusLike(@CurrentUser() cat: Cat, @Param('id') id: string) {
    console.log(cat);
    return this.commentsService.plusLike(cat, id);
  }
}
