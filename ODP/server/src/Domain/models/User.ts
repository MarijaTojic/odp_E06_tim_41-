export class User {
  static create(arg0: { username: string; password: string; role: string; }) {
    throw new Error("Method not implemented.");
  }
  public constructor(
    public id: number = 0,
    public korisnickoIme: string = '',
    public uloga: string = 'user',
    public lozinka: string = ''
  ) {}
}