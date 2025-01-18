import { Document, model, models, Schema, Types } from "mongoose";

export interface IQuestion {
  author: Types.ObjectId;
  title: string;
  content: string;
  tags: Types.ObjectId[];
  answers: number;
  upvotes: number;
  downvotes: number;
  views: number;
}

export interface IQuestionDoc extends IQuestion, Document {}
const QuestionSchema = new Schema<IQuestion>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
  },
  // Gera o timestamp quando a questão é criada
  { timestamps: true }
);

// Verifica se o modelo de questão já está registrado (models), senão cria um novo
const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
