const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  QUESTION: (id: string) => `/questions/${id}`,
  EDIT_QUESTION: (id: string) => `${ROUTES.QUESTION(id)}/edit`,
  PROFILE: (id: string) => `/profile/${id}`,
  TAGS: "/tags",
  TAG: (id: string) => `${ROUTES.TAGS}/${id}`,
  EDIT_TAG: (id: string) => `${ROUTES.TAGS}/tags/${id}/edit`,
  COLLECTION: "/collection",
};

export default ROUTES;
