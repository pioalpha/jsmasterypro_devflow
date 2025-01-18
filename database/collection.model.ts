import { model, models, Schema, Types } from "mongoose";

export interface ICollection {
  author: Types.ObjectId;
  question: Types.ObjectId;
}

const CollectionSchema = new Schema<ICollection>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  // Gera o timestamp quando a coleção é criada
  { timestamps: true }
);

// Verifica se o modelo de coleção já está registrado (models), senão cria um novo
const Collection =
  models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;
