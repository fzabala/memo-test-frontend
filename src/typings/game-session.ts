declare type GameSession = {
  id: string;
  retries: number;
  number_of_pairs: number;
  state: GameSessionState;
  memo_test_id: number;
  score?: number;
};

declare type GameSessionState = "STARTED" | "COMPLETED";
