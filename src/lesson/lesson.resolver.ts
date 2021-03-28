import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonCreateDto } from './lesson.create.dto';
import { AssignStudentToLessonInputDto } from './assign-student-to-lesson.input.dto';
import { StudentType } from '../student/student.type';
import { LessonEntity } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query(returns => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getById(id);
  }

  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.getAll();
  }

  @Mutation(returns => LessonType)
  createLesson(@Args('createLessonInput') createLessonInput: LessonCreateDto) {
    return this.lessonService.create(createLessonInput); 
  }

  @Mutation(returns => LessonType)
  assignStudentsToLesson(@Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentToLessonInputDto) {
    const { lessonId, studentsIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentsIds);
  }

  @ResolveField(returns => [StudentType])
  students(@Parent() lesson: LessonEntity) {
    return this.studentService.getStudentsById(lesson.students);
  }
}