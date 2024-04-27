declare type MemoTest = {
  id: number;
  name: string;
  images: MemoTestImage[];
  highest_score: number;
};

declare type MemoTestImage = {
  id: number;
  url: string;
};
