import { Rating } from "./Rating";
import { Trivia } from "./Trivia";

export class Content {
  public constructor(
  id: number,
  title: string,
  description: string,
  type: 'film' | 'serija',
  year: number,
  genre: string,
  imageUrl: string,
  ratings?: Rating[], // opcionalno, za povezane ocene
  trivia?: Trivia[],
   ) {} // opcionalno, za povezane trivije
}
