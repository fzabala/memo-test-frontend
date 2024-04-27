import gql from "graphql-tag";

export const GET_GAME_SESSION_BY_ID = gql`
  query GetGameSessionById($id: ID!) {
    getGameSessionById(id: $id) {
      id
      retries
      number_of_pairs
      state
    }
  }
`;
