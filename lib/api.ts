import { IAccount } from "@/database/account.model";
import { IUser } from "@/database/user.model";
import { ActionResponse } from "@/types/global";

import { fetchHandler } from "./handlers/fetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

const makeApiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  body: unknown = null,
  headers: HeadersInit = {}
): Promise<ActionResponse<T>> => {
  const options: RequestInit = { method, headers: { ...headers } };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetchHandler(endpoint, options);
};

export const api = {
  auth: {
    oAuthSignIn: ({
      user,
      provider,
      providerAccountId,
    }: SignInWithOAuthParams) =>
      makeApiRequest<unknown>(
        `${API_BASE_URL}/auth/signin-with-oauth`,
        "POST",
        {
          user,
          provider,
          providerAccountId,
        }
      ),
  },

  users: {
    getAll: () => makeApiRequest<IUser[]>(`${API_BASE_URL}/users`),
    getById: (id: string) =>
      makeApiRequest<IUser>(`${API_BASE_URL}/users/${id}`),
    getByEmail: (email: string) =>
      makeApiRequest<IUser>(`${API_BASE_URL}/users/email`, "POST", { email }),
    create: (userData: Partial<IUser>) =>
      makeApiRequest<IUser>(`${API_BASE_URL}/users`, "POST", userData),
    update: (id: string, userData: Partial<IUser>) =>
      makeApiRequest<IUser>(`${API_BASE_URL}/users/${id}`, "PUT", userData),
    delete: (id: string) =>
      makeApiRequest<IUser>(`${API_BASE_URL}/users/${id}`, "DELETE"),
  },

  accounts: {
    getAll: () => makeApiRequest<IAccount[]>(`${API_BASE_URL}/accounts`),
    getById: (id: string) =>
      makeApiRequest<IAccount>(`${API_BASE_URL}/accounts/${id}`),
    getByProvider: (providerAccountId: string) =>
      makeApiRequest<IAccount>(`${API_BASE_URL}/accounts/provider`, "POST", {
        providerAccountId,
      }),
    create: (accountData: Partial<IAccount>) =>
      makeApiRequest<IAccount>(`${API_BASE_URL}/accounts`, "POST", accountData),
    update: (id: string, accountData: Partial<IAccount>) =>
      makeApiRequest<IAccount>(
        `${API_BASE_URL}/accounts/${id}`,
        "PUT",
        accountData
      ),
    delete: (id: string) =>
      makeApiRequest<IAccount>(`${API_BASE_URL}/accounts/${id}`, "DELETE"),
  },
};
