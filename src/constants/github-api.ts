const GITHUB_API = {
  HEADERS: {
    X_GITHUB_API_VERSION: "X-Github-Api-Version",
    VERSION: "2022-11-28",
  },
  ENDPOINTS: {
    BRANCH: {
      LIST: "GET /repos/{owner}/{repo}/branches",
    },
  },
};

export { GITHUB_API };
