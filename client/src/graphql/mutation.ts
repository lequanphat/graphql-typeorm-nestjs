import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($createUserData: CreateUserInput!) {
    createUser(createUserData: $createUserData) {
      id
      username
      displayName
    }
  }
`;

export const DELETE_USER_MUTAION = gql`
  mutation ($deleteUserId: Int!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

export const CREATE_USER_SETTING_MUTAION = gql`
  mutation ($createUserSettingsData: CreateUserSettingInput!) {
    createUserSettings(createUserSettingsData: $createUserSettingsData) {
      userId
      receiveEmails
      receiveNotifications
    }
  }
`;
