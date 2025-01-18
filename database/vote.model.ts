import { Document, model, models, Schema, Types } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  actionId: Types.ObjectId;
  actionType: "question" | "asnwer";
  voteType: "upvote" | "downvote";
}

export interface IVoteDoc extends IVote, Document {}
const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actionId: { type: Schema.Types.ObjectId },
    actionType: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  // Gera o timestamp quando o voto é criada
  { timestamps: true }
);

// Verifica se o modelo de voto já está registrado (models), senão cria um novo
const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
