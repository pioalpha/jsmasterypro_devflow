import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  password?: string; // oAuth não requer senha
  provider: string;
  providerAccountId: string;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  // Gera o timestamp quando a conte é criada
  { timestamps: true }
);

// Verifica se o modelo de usuário já está registrado (models), senão cria um novo
const Account = models?.account || model<IAccount>("Account", AccountSchema);

export default Account;
