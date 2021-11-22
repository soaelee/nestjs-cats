import { CatRequestDto } from './dtos/cat-request.dto';
import { Cat } from './cats.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommentSchema } from 'src/comments/comments.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat> {
    return await this.catModel.findOne({ email });
  }

  async findCatByIdWithoutPassword(
    id: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(id).select('-password');
    return cat;
  }

  async findByIdAndUpdateImg(
    id: string,
    fileName: string,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    return newCat;
  }

  async getAllCats(): Promise<Cat[]> {
    const CommentsModel = mongoose.model('comments', CommentSchema);
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);
    return result;
  }
}
