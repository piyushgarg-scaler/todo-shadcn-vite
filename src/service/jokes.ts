import { Joke, JokeCategory } from "@/types/joke";
import axios, { Axios } from "axios";

class JokeService {
  private apiInstance: Axios;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: "https://v2.jokeapi.dev/joke",
      responseType: "json",
    });
  }

  public async getJokeByCategories(categories: JokeCategory[]): Promise<Joke> {
    const { data } = await this.apiInstance.get<Joke>(
      `${categories.join(",")}?type=single`
    );
    return data;
  }
}

export default new JokeService();
