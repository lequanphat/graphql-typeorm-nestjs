import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/UserSettings';
import { CreateUserSettingInput } from '../types/CreateUserSettingInput';
import { mockUserSetting } from 'src/__mocks__/mock_user_setting';

@Resolver()
export class UserSettingResolver {
  @Mutation(() => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingInput,
  ) {
    mockUserSetting.push(createUserSettingsData);
    return createUserSettingsData;
  }
}
