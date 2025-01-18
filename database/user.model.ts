import { model, models, Schema } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String, required: true },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: String, default: 0 },
  },
  // Gera o timestamp quando o usuário é criado
  { timestamps: true }
);

// Verifica se o modelo de usuário já está registrado (models), senão cria um novo
const User = models?.user || model<IUser>("User", UserSchema);

export default User;
