import { CatsRepository } from './cats.repository';
import { CatRequestDto } from './dtos/cat-request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto): Promise<Cat['readOnlyData']> {
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
}
