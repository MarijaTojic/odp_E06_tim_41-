export class Trivia {
  static findByPk(triviaId: number) {
      throw new Error("Method not implemented.");
  }
  static findAll(arg0: { where: { contentId: number; }; }) {
    throw new Error("Method not implemented.");
  }
  static create(arg0: { triviaText: string; contentId: any; }) {
    throw new Error("Method not implemented.");
  }
  public constructor(
  id: number,
  contentId: number,
  triviaText: string
  ) {}
}
