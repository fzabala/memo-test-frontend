declare type GameSession = {
  id: number;
  retries: number;
  number_of_pairs: number;
  state: GameSessionState;
  memo_test_id: number;
};

declare type GameSessionState = "STARTED" | "COMPLETED";
