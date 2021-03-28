import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { LessonEntity } from './lesson.entity';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), StudentModule],
  providers: [LessonResolver, LessonService]
})
export class LessonModule {}
