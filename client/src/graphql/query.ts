import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query ExampleQuery {
    getAllUsers {
      id
      username
      displayName
      settings {
        receiveEmails
        receiveNotifications
      }
    }
  }
`;
