import gql from "graphql-tag";

export const GET_MEMO_TESTS = gql`
  query GetMemoTests {
    getMemoTests {
      id
      name
    }
  }
`;
