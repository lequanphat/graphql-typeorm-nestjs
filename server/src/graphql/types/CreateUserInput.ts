import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  @Field({ nullable: true })
  displayName: string;
  @Field({ defaultValue: '' })
  avatar?: string;
  @Field({ defaultValue: 'system' })
  type?: string;
}
