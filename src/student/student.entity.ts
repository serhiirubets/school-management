import { Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentEntity {
  @ObjectIdColumn()
  _id: string;
  
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}