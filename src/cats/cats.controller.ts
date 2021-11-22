import { multerOptions } from './../common/utils/multer.options';
import { Cat } from './cats.schema';
import { CurrentUser } from './../common/decorators/user.decorator';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { AuthService } from './../auth/auth.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptors';
import { CatRequestDto } from './dtos/cat-request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dtos/cat.dto';
import { LoginRequestDto } from 'src/auth/dtos/login.request.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat: Cat): ReadOnlyCatDto {
    // 현재 로그인 한 고양이
    console.log(cat);
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 200,
    description: 'Successed!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  @UsePipes(ValidationPipe)
  signUp(@Body() body: CatRequestDto): Promise<ReadOnlyCatDto> {
    return this.catsService.signUp(body);
  }

  @ApiResponse({
    status: 200,
    description: 'Successed!',
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() body: LoginRequestDto): Promise<{ token: string }> {
    return this.authService.jwtLogin(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logOut';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @Post('upload')
  uploadCatImg(
    @CurrentUser() cat: Cat,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ReadOnlyCatDto> {
    console.log(files);
    //return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, files);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllCat(): Promise<ReadOnlyCatDto[]> {
    return this.catsService.getAllCats();
  }
}
