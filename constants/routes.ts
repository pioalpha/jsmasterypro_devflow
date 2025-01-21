const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  QUESTION: (id: string) => `/questions/${id}`,
  EDIT_QUESTION: (id: string) => `${ROUTES.QUESTION(id)}/edit`,
  DETAIL_QUESTION: (id: string) => `${ROUTES.QUESTION(id)}/detail`,
  PROFILE: (id: string) => `/profile/${id}`,
  TAGS: "/tags",
  EDIT_TAG: (id: string) => `${ROUTES.TAGS}/tags/${id}/edit`,
  DETAIL_TAG: (id: string) => `${ROUTES.TAGS}/tags/${id}/detail`,
  COLLECTION: "/collection",
};

export default ROUTES;
