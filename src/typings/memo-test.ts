declare type MemoTest = {
  id: string;
  name: string;
  images: MemoTestImage[];
  active_game_session?: GameSession;
  highest_score: number;
};

declare type MemoTestImage = {
  id: string;
  url: string;
};
