const parseRepositoryUrl = (
  repositoryUrl: string,
): { owner: string; repositoryName: string } => {
  const [owner, repositoryName] = repositoryUrl
    .replace("https://github.com/", "")
    .replace(".git", "")
    .split("/");

  return {
    owner,
    repositoryName,
  };
};

export default parseRepositoryUrl;
