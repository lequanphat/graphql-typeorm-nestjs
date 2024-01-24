import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './UserSettings';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @Column({ default: '' })
  @Field({ defaultValue: '' })
  avatar: string;

  @Column({ default: 'system' })
  @Field({ defaultValue: 'system' })
  type: string;

  @OneToOne(() => UserSetting)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;
}
