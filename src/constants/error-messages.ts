const VALIDATION_ERROR_MESSAGES = {
  UNRECOGNIZED_KEYS: "허용되지 않은 파라미터가 포함되어 있습니다.",
};

const GITHUB_REPOSITORY_ERROR_MESSAGES = {
  INVALID_URL:
    "유효한 GitHub 저장소 URL을 입력해주세요. (예: https://github.com/owner/repository.git)",
  NOT_FOUND: "존재하지 않거나 접근할 수 없는 Repository입니다.",
  INVALID_REPO_PATH:
    "레포지토리 URL은 반드시 'github.com/owner/repo' 형태여야 합니다.",
};

export { VALIDATION_ERROR_MESSAGES, GITHUB_REPOSITORY_ERROR_MESSAGES };
