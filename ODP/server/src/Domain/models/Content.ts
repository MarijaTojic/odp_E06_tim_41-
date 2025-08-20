import { Rating } from "./Rating";
import { Trivia } from "./Trivia";

export class Content {
  static findByPk(contentId: number, arg1: { include: (typeof Trivia | typeof Rating)[]; }) {
    throw new Error("Method not implemented.");
  }
  static findAll(p0: { include: any[]; }) {
    throw new Error("Method not implemented.");
  }
  static create(arg0: { title: string; type: string; }) {
    throw new Error("Method not implemented.");
  }
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
