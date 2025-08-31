const GITHUB_REPOSITORY_RULES = {
  URL_PREFIX: "https://github.com/",
  SUFFIX_REGEX: /\.git\/?$/,
  REPOSITORY_REGEX:
    /^(https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\.git)?\/?$|git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-])$/,
};

export { GITHUB_REPOSITORY_RULES };
