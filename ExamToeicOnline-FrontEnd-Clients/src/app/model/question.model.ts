export class Question {
  constructor(
    public id: number,
    public content: string,
    public groupQuestionId: number,
    public image?: BinaryType
  ) {}
}