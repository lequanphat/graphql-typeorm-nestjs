import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/User';

@Resolver()
export class UsersResolver {
  constructor() {}
  @Query((returns) => User)
  getUser() {
    return {
      id: 1,
      username: 'quanphat',
      displayName: 'Le Quan Phat',
    };
  }
}
