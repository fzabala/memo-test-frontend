import gql from "graphql-tag";

export const GET_MEMO_TESTS = gql`
  query GetMemoTests {
    getMemoTests {
      id
      name
      highest_score
    }
  }
`;

export const GET_MEMO_TEST_BY_ID = gql`
  query GetMemoTestById($id: ID!) {
    getMemoTestById(id: $id) {
      id
      name
      images {
        id
        url
      }
    }
  }
`;
