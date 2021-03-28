import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { LessonCreateDto } from './lesson.create.dto';

@Injectable()
export class LessonService {
  constructor(@InjectRepository(LessonEntity) private lessonRepository: Repository<LessonEntity>) {
  }

  async create(lessonDto: LessonCreateDto): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.create({
      id: uuid(),
      ...lessonDto,
    });

    return this.lessonRepository.save(lesson);
  }

  getById(id: string): Promise<LessonEntity> {
    return this.lessonRepository.findOne({ id });
  }

  getAll(): Promise<LessonEntity[]> {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson(lessonId: string, studentsId: string[]): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentsId];
    return this.lessonRepository.save(lesson);
  }
}
