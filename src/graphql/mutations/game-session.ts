import gql from "graphql-tag";

export const CREATE_GAME_SESSION_BY_ID = gql`
  mutation CreateGameSession($gameId: Int!) {
    createGameSession(gameId: $gameId) {
      id
      retries
      memo_test_id
      number_of_pairs
      state
    }
  }
`;
