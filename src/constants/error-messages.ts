const VALIDATION_ERROR_MESSAGES = {
  UNRECOGNIZED_KEYS: "허용되지 않은 파라미터가 포함되어 있습니다.",
};

const GITHUB_REPOSITORY_ERROR_MESSAGES = {
  INVALID_URL:
    "유효한 GitHub 리포지토리 URL을 입력해주세요. \n (예: https://github.com/owner/repository(.git), owner: 리포지토리 소유자, repository: 리포지토리 이름)",
  NOT_FOUND: "존재하지 않거나 접근할 수 없는 Repository입니다.",
};

const SYSTEM_ERROR_MESSAGES = {
  SERVER: "서버 오류가 발생했습니다.",
  NETWORK: "네트워크 에러가 발생했습니다.",
};

const MERMAID_ERROR_MESSAGES = {
  MERMAID_RENDER_ERROR: "다이어그램을 렌더링하는 중 오류가 발생했습니다.",
};

const TOKEN_ERROR_MESSAGES = {
  GITHUB_REFRESH_FAILED: "GitHub 토큰 갱신 요청 실패했습니다.",
  GITHUB_REFRESH_INVALID: "GitHub 토큰 갱신 응답이 올바르지 않습니다.",
  GITHUB_REFRESH_NO_REFRESH_TOKEN:
    "리프레시 토큰이 존재하지 않아 갱신할 수 없습니다.",
};

const AUTH_ERROR_MESSAGES = {
  INVALID_PROVIDER: "지원하지 않는 OAuth 공급자입니다.",
  INVALID_REDIRECT_URL: "허용되지 않은 redirect URL입니다.",
  INTERNAL_ERROR: "내부 오류로 인해 요청이 실패했습니다.",
  UNKNOWN: "로그인 처리 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.",
};

const OPENAI_ERROR_MESSAGES = {
  ZOD_VALIDATION_FAILED: "모델 출력이 스키마와 일치하지 않습니다.",
  RESPONSE_CREATION_FAILED: "OpenAI 응답 생성에 실패했습니다.",
  MODEL_REFUSAL: "모델이 요청을 거절했습니다. 요청 내용을 점검하세요.",
  OUTPUT_TEXT_NOT_FOUND:
    "모델 응답에서 output_text를 찾지 못했습니다. prompt/형식 지시 또는 zod 포맷 설정을 점검하세요.",
  INCOMPLETE_DUE_TO_MAX_TOKENS:
    "모델 응답이 출력 토큰 한도(max_output_tokens)로 잘렸습니다. max_output_tokens 값을 늘리거나 배치 크기를 줄여주세요.",
};

export {
  VALIDATION_ERROR_MESSAGES,
  GITHUB_REPOSITORY_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
  MERMAID_ERROR_MESSAGES,
  OPENAI_ERROR_MESSAGES,
  TOKEN_ERROR_MESSAGES,
  AUTH_ERROR_MESSAGES,
};
