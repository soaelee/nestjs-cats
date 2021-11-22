import { ReadOnlyCatDto } from './dtos/cat.dto';
import { CatsRepository } from './cats.repository';
import { CatRequestDto } from './dtos/cat-request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto): Promise<ReadOnlyCatDto> {
    const { email, password, name } = body;
    // validation > encoding > save
    const isCatExist: boolean = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다'); //403
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async uploadImg(
    cat: Cat,
    files: Array<Express.Multer.File>,
  ): Promise<ReadOnlyCatDto> {
    const fileName = `cats/${files[0].filename}`;
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    return newCat.readOnlyData;
  }

  async getAllCats(): Promise<ReadOnlyCatDto[]> {
    const allCat = await this.catsRepository.getAllCats();
    const readOnlyCat = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCat;
  }
}
