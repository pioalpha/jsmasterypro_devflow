import { model, models, Schema, Types } from "mongoose";

export interface IInteraction {
  user: Types.ObjectId;
  actionId: Types.ObjectId;
  action: "downvote" | "upvote" | "view" | "post";
  actionType: "question" | "answer" | "user";
}

const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actionId: { type: Schema.Types.ObjectId, required: true }, // question, answer or user
    action: {
      type: String,
      enum: ["downvote", "upvote", "view", "post"],
      required: true,
    },
    actionType: {
      type: String,
      enum: ["question", "answer", "user"],
      required: true,
    },
  },
  // Gera o timestamp quando a interação é criada
  { timestamps: true }
);

// Verifica se o modelo de interação já está registrado (models), senão cria um novo
const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
