import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { StudentCreateDto } from "./student.create.dto";
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}
  @Query(returns => [StudentType])
  students(): Promise<StudentEntity[]> {
    return this.studentService.getAll();
  }

  @Query(returns => StudentType) 
  student(@Args('id') id: string): Promise<StudentEntity> {
    return this.studentService.getById(id);
  }

  @Mutation(returns => StudentType)
  createStudent(@Args('createStudentInput') createStudentInput: StudentCreateDto) {
    return this.studentService.create(createStudentInput)
  }

}