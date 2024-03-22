export type JokeCategory = "Programming" | "Spooky";

export interface Joke {
  error: boolean;
  safe: boolean;
  category: JokeCategory;
  type: string;
  joke: string;
  lang: string;
  id: string;
}
