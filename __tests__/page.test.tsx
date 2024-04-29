import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "../src/app/page";
import { GET_MEMO_TESTS } from "@/graphql";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const getMemoTests = [
  {
    id: "1",
    name: "Test name",
    active_game_session: null,
    highest_score: 0,
  },
  {
    id: "2",
    name: "Test name 2",
    active_game_session: { id: "99" },
    highest_score: 50,
  },
];

const defaultMock = {
  delay: 30,
  request: {
    query: GET_MEMO_TESTS,
  },
  result: {
    data: {
      getMemoTests,
    },
  },
};

const mocks1 = [defaultMock];

const mocks2 = [
  {
    ...defaultMock,
    delay: 0,
  },
];

describe("Page", () => {
  it("Renders page with loading", async () => {
    render(
      <MockedProvider mocks={mocks1} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(await screen.findByText("Memo test")).toBeInTheDocument();
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  it("Renders memo items", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks2} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findByText("Memo test")).toBeInTheDocument();
    expect(container.querySelector(".memoGrid")).toBeInTheDocument();
    expect(container.querySelectorAll(".memoGrid > .memoItem")).toHaveLength(
      getMemoTests.length
    );

    const gameWithoutSession = container.querySelector(
      ".memoGrid > .memoItem:nth-child(1)"
    );
    expect(
      gameWithoutSession?.querySelector(".memoItem-title")?.textContent
    ).toBe(getMemoTests[0].name);
    expect(
      gameWithoutSession?.querySelector(".memoItem-score")?.textContent
    ).toBe(`Highest score: ${getMemoTests[0].highest_score}`);
    expect(gameWithoutSession?.querySelector(".button")?.textContent).toBe(
      "Start"
    );
    const gameWithSession = container.querySelector(
      ".memoGrid > .memoItem:nth-child(2)"
    );

    expect(gameWithSession?.querySelector(".memoItem-title")?.textContent).toBe(
      getMemoTests[1].name
    );
    expect(gameWithSession?.querySelector(".memoItem-score")?.textContent).toBe(
      `Highest score: ${getMemoTests[1].highest_score}`
    );
    expect(gameWithSession?.querySelector(".button")?.textContent).toBe(
      "Start"
    );
  });
});
