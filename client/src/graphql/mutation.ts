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

