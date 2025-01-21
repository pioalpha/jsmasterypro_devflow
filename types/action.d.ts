import { PaginatedSearchParams } from "./global";

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

interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}

interface GetQuestionParams {
  questionId: string;
}

interface EditQuestionParams extends CreateQuestionParams, GetQuestionParams {}

interface GetTagQuestionsParams extends Omit<PaginatedSearchParams, "filter"> {
  tagId: string;
}
