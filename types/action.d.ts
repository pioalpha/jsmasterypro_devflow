interface SignInWithOAuthParams {
  user: {
    email: string;
    name: string;
    image: string;
    username: string;
  };
  provider: "github" | "google";
  providerAccountId: string;
}
