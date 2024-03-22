import { useEffect, useState } from "react";
import axios from "axios";
import { Joke, JokeCategory } from "@/types/joke";

export const useJokes = (categories: JokeCategory[]) => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Joke>(
          `https://v2.jokeapi.dev/joke/${categories.join(",")}?type=single`
        );
        setJoke(data);
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [categories]);

  return { joke, isLoading, error };
};
