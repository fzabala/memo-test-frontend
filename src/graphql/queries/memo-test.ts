import gql from "graphql-tag";

export const GET_MEMO_TESTS = gql`
  query GetMemoTests {
    getMemoTests {
      id
      name
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
