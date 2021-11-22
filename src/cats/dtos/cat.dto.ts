import { Cat } from './../cats.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class ReadOnlyCatDto extends PickType(Cat, [
  'email',
  'name',
  'comments',
]) {
  @ApiProperty({
    example: '12343215',
    description: 'id',
    required: true,
  })
  id: string;
}
