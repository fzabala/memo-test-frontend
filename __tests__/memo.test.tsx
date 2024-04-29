import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import MemoGame from "../src/app/memo/[id]/page";
import { CREATE_GAME_SESSION_BY_ID, GET_MEMO_TEST_BY_ID } from "@/graphql";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const getMemoTestById = [
  {
    id: "1",
    name: "Test name",
    images: [
      { id: "1", url: "http://mock.ed/image.png" },
      { id: "2", url: "http://mock.ed/image.png" },
      { id: "3", url: "http://mock.ed/image2.png" },
      { id: "4", url: "http://mock.ed/image2.png" },
    ],
  },
];

const createGameSession = {
  id: "2",
  retries: 0,
  memo_test_id: 1,
  number_of_pairs: 2,
  state: "STARTED",
  cardsGameSession: [
    {
      id: "1",
      flipped: false,
      selected: false,
      image: {
        id: "1",
        url: "https://mock.url/image.png",
      },
    },
    {
      id: "2",
      flipped: false,
      selected: false,
      image: {
        id: "1",
        url: "https://mock.url/image.png",
      },
    },
    {
      id: "3",
      flipped: false,
      selected: false,
      image: {
        id: "2",
        url: "https://mock.url/image2.png",
      },
    },
    {
      id: "4",
      flipped: false,
      selected: false,
      image: {
        id: "2",
        url: "https://mock.url/image2.png",
      },
    },
  ],
};

const defaultMock = {
  delay: 30,
  request: {
    query: GET_MEMO_TEST_BY_ID,
    variables: { id: 1 },
  },
  result: {
    data: {
      getMemoTestById,
    },
  },
};

const sessionMock = {
  request: {
    query: CREATE_GAME_SESSION_BY_ID,
    variables: { gameId: 1 },
  },
  result: {
    data: {
      createGameSession,
    },
  },
};

const mocks1 = [defaultMock, sessionMock];

const mocks2 = [{ ...defaultMock, delay: 0 }, sessionMock];

describe("Memo game", () => {
  it("Renders page with loading", async () => {
    render(
      <MockedProvider mocks={mocks1} addTypename={false}>
        <MemoGame params={{ id: "1" }} />
      </MockedProvider>
    );

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });
  it("Renders page with cards", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks2} addTypename={false}>
        <MemoGame params={{ id: "1" }} />
      </MockedProvider>
    );

    expect(await screen.findByText("Game #1")).toBeInTheDocument();

    expect(container.querySelectorAll(".memoGame .card")).toHaveLength(
      createGameSession.cardsGameSession.length
    );
  });
});
