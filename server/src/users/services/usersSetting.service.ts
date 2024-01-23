import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSettings';
import { CreateUserSettingInput } from 'src/graphql/types/CreateUserSettingInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private readonly usersSettingRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getUserSettingById(userId: number) {
    return this.usersSettingRepository.findOneBy({ userId });
  }
  async createUserSetting(createUserSettingData: CreateUserSettingInput) {
    const findUser = await this.usersRepository.findOneBy({
      id: createUserSettingData.userId,
    });
    if (!findUser) throw new Error('User not found!!!');
    const userSetting = this.usersSettingRepository.create(
      createUserSettingData,
    );
    const settings = await this.usersSettingRepository.save(userSetting);
    findUser.settings = settings;
    this.usersRepository.save(findUser);
    return settings;
  }
  async deleteUserSetting(userId: number) {
    const userSetting = await this.usersSettingRepository.findOne({
      where: { userId },
    });
    if (!userSetting) throw new Error('User settings not found!!!');
    await this.usersSettingRepository.delete({ userId });
    return userSetting;
  }
}
