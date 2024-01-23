import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../../graphql/models/User';
import { UserSetting } from '../../graphql/models/UserSettings';
import { CreateUserInput } from '../../graphql/types/CreateUserInput';
import { Inject } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserSettingService } from '../services/usersSetting.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(UserSettingService)
    private readonly userSettingService: UserSettingService,
  ) {}
  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getUserByID(id);
  }

  @Query(() => [User])
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ResolveField(() => UserSetting, { nullable: true, name: 'settings' })
  getAllUserSettings(@Parent() user: User) {
    return this.userSettingService.getUserSettingById(user.id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.createUser(createUserData);
  }
  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.deleteUser(id);
  }
}
