import { Rating } from "./Rating";
import { Trivia } from "./Trivia";

export class Content {
  title: any;
  description: any;
  type: any;
  genre: any;
  imageURL: any;
  rating?: Rating[];
  trivia?: Trivia;
   public constructor(
      title?: any,
      description?: any,
      type?: any,
      genre?: any,
      imageURL?: any,
      rating?: Rating[],
      trivia?: Trivia,
   ) {} 

}
