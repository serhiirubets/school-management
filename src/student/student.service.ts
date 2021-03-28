import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'node:domain';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { StudentCreateDto } from './student.create.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>
  ) {
  
  }

  create(studentInput: StudentCreateDto): Promise<StudentEntity> {
    const student = this.studentRepository.create({
      id: uuid(),
      ...studentInput,
    });

    return this.studentRepository.save(student);
  }

  getAll(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  getById(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOne({ id });
  }

  getStudentsById(ids: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: ids
        }
      }
    });
  }
}
