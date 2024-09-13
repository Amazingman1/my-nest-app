import { Injectable } from '@nestjs/common';
import { CreateImgDto } from './dto/create-img.dto';
import { UpdateImgDto } from './dto/update-img.dto';

@Injectable()
export class ImgService {
  create(createImgDto: CreateImgDto) {
    return {
      status: 'success',
      code: 200,
      data: createImgDto,
    };
  }

  findAll() {
    return `This action returns all img`;
  }

  findOne(id: number) {
    return `This action returns a #${id} img`;
  }

  update(id: number, updateImgDto: UpdateImgDto) {
    return `This action updates a #${id} img`;
  }

  remove(id: number) {
    return `This action removes a #${id} img`;
  }
}
