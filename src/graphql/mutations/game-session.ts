import gql from "graphql-tag";

export const CREATE_GAME_SESSION_BY_ID = gql`
  mutation CreateGameSession($gameId: Int!) {
    createGameSession(gameId: $gameId) {
      id
      retries
      memo_test_id
      number_of_pairs
      state
      cardsGameSession {
        id
        flipped
        selected
        image {
          id
          url
        }
      }
    }
  }
`;

export const COMPLETE_SESSION = gql`
  mutation CompleteSession($id: Int!) {
    completeSession(id: $id) {
      id
      retries
      memo_test_id
      number_of_pairs
      state
      score
      cardsGameSession {
        id
        flipped
        selected
        image {
          id
          url
        }
      }
    }
  }
`;

export const UPDATE_PROGRESS = gql`
  mutation UpdateProgress($id: Int!, $flipped: Boolean!, $selected: Boolean!) {
    updateProgress(id: $id, flipped: $flipped, selected: $selected) {
      id
      retries
      memo_test_id
      number_of_pairs
      state
      score
      cardsGameSession {
        id
        flipped
        selected
        image {
          id
          url
        }
      }
    }
  }
`;
