export class Rating {

  getDataValue(arg0: string) {
    throw new Error("Method not implemented.");
  }
  static findByPk(ratingId: number) {
      throw new Error("Method not implemented.");
  }
  static findAll(arg0: { where: { contentId: number; }; }) {
    throw new Error("Method not implemented.");
  }
  static create(arg0: { ratingValue: number; userId: any; contentId: any; }) {
    throw new Error("Method not implemented.");
  }
  public constructor(
  id: number,
  userId: number,
  contentId: number,
  ratingValue: number,
  ) {}
  
}
