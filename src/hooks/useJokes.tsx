import axios from "axios";
import { Joke, JokeCategory } from "@/types/joke";
import { useEffect, useState } from "react";

export const useJokes = (categories: JokeCategory[]) => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Joke>(
        `https://v2.jokeapi.dev/joke/${categories.join(",")}?type=single`
      )
      .then((res) => setJoke(res.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { joke, isLoading };
};
