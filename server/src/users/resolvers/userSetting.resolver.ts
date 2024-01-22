import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../../graphql/models/UserSettings';
import { CreateUserSettingInput } from '../../graphql/types/CreateUserSettingInput';
import { UserSettingService } from '../services/usersSetting.service';
import { Inject } from '@nestjs/common';

@Resolver()
export class UserSettingResolver {
  constructor(
    @Inject(UserSettingService)
    private readonly userSettingService: UserSettingService,
  ) {}
  @Mutation(() => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingInput,
  ) {
    return this.userSettingService.createUserSetting(createUserSettingsData);
  }
}
