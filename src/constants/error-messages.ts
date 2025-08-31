const VALIDATION_ERROR_MESSAGES = {
  UNRECOGNIZED_KEYS: "허용되지 않은 파라미터가 포함되어 있습니다.",
};

const GITHUB_REPOSITORY_ERROR_MESSAGES = {
  INVALID_URL:
    "유효한 GitHub 리포지토리 URL을 입력해주세요. (예: https://github.com/owner/repository(.git), owner: 리포지토리 소유자, repository: 리포지토리 이름)",
  NOT_FOUND: "존재하지 않거나 접근할 수 없는 Repository입니다.",
};

const MERMAID_ERROR_MESSAGES = {
  MERMAID_RENDER_ERROR: "다이어그램을 렌더링하는 중 오류가 발생했습니다.",
};

export {
  VALIDATION_ERROR_MESSAGES,
  GITHUB_REPOSITORY_ERROR_MESSAGES,
  MERMAID_ERROR_MESSAGES,
};
