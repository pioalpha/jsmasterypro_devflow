import { model, models, Schema, Types } from "mongoose";

export interface IModel {}

const ModelSchema = new Schema<IModel>(
  {},
  // Gera o timestamp quando é criado
  { timestamps: true }
);

// Verifica se o modelo já está registrado (models), senão cria um novo
const Model = models?.Model || model<IModel>("Model", ModelSchema);

export default Model;
