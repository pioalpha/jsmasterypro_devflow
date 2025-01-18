import { model, models, Schema, Types } from "mongoose";

export interface IAnswer {
  author: Types.ObjectId;
  question: Types.ObjectId;
  content: string;
  upvotes: number;
  downvotes: number;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  // Gera o timestamp quando a resposta é criada
  { timestamps: true }
);

// Verifica se o modelo de resposta já está registrado (models), senão cria um novo
const Answer = models?.Answer || model<IAnswer>("Answer", AnswerSchema);

export default Answer;
