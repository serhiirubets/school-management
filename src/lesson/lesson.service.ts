import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { LessonType } from './lesson.type';
import { LessonCreateDto } from './lesson.create.dto';

@Injectable()
export class LessonService {
  constructor(@InjectRepository(LessonEntity) private lessonRepository: Repository<LessonEntity>) {
  }

  async create(lessonDto: LessonCreateDto): Promise<LessonType> {
    const lesson = await this.lessonRepository.create({
      id: uuid(),
      ...lessonDto,
    });

    return this.lessonRepository.save(lesson);
  }

  getById(id: string): Promise<LessonType> {
    return this.lessonRepository.findOne({ id });
  }

  getAll(): Promise<LessonType[]> {
    return this.lessonRepository.find();
  }
}
