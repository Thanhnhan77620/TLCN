import { Answer } from './answer.model';
export class Question {
  id: number;
  content: string;
  groupQuestionId: number;
  partName: string;
  examId: number;
  anwsers: Answer[];
  image?: string;
}


