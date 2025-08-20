import { User } from "../../Domain/models/User";
import { Content } from "../../Domain/models/Content";
import { Rating } from "../../Domain/models/Rating";
import { Trivia } from "../../Domain/models/Trivia";

export const users: User[] = [
  { id: 1, korisnickoIme: 'marija', lozinka: '123', uloga: 'user' },
  { id: 2, korisnickoIme: 'admin', lozinka: 'admin', uloga: 'admin' }
];

export const contents: Content[] = [
  { id: 1, title: 'Inception', description: 'Sci-Fi film', type: 'film', year: 2010, genre: 'Sci-Fi', imageUrl: '', ratings: [], trivia: [] },
  { id: 2, title: 'Friends', description: 'Sitcom serija', type: 'serija', year: 1994, genre: 'Comedy', imageUrl: '', ratings: [], trivia: [] }
];

export const ratings: Rating[] = [
  { id: 1, userId: 1, contentId: 1, ratingValue: 5 },
  { id: 2, userId: 1, contentId: 2, ratingValue: 4 }
];

export const trivias: Trivia[] = [
  { id: 1, contentId: 1, triviaText: 'Film je režirao Christopher Nolan' },
  { id: 2, contentId: 2, triviaText: 'Serija je emitovana 10 godina' }
];
