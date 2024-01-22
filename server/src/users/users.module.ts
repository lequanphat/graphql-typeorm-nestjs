import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettingService } from './services/usersSetting.service';
import { UserSetting } from 'src/graphql/models/UserSettings';
import { UserSettingResolver } from './resolvers/userSetting.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UsersResolver,
    UserSettingResolver,
    UsersService,
    UserSettingService,
  ],
})
export class UsersModule {}
