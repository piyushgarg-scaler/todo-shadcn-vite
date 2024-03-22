import { useEffect, useState } from "react";
import jokeService from "@/service/jokes";
import { Joke, JokeCategory } from "@/types/joke";

export const useJokes = (categories: JokeCategory[]) => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const joke = await jokeService.getJokeByCategories(categories);
        setJoke(joke);
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [categories]);

  return { joke, isLoading, error };
};
