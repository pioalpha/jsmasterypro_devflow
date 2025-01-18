import { model, models, Schema } from "mongoose";

export interface ITag {
  name: string;
  questions: number;
}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
  },
  // Gera o timestamp quando a tag é criada
  { timestamps: true }
);

// Verifica se o modelo de tag já está registrado (models), senão cria um novo
const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
