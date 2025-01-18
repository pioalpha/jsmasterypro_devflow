import { model, models, Schema, Types } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: string;
  voteType: string;
}

const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    id: { type: Schema.Types.ObjectId },
    type: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  // Gera o timestamp quando o voto é criada
  { timestamps: true }
);

// Verifica se o modelo de voto já está registrado (models), senão cria um novo
const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
