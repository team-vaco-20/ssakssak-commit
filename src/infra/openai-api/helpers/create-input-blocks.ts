type InputBlock = { type: "input_text"; text: string };
interface BuildInputBlocksParams {
  intro: string;
  payload: unknown;
  repositoryDescription?: string;
}

const INPUT_TEXT_CONTENT_TYPE = "input_text";

const createInputBlocks = ({
  intro,
  payload,
  repositoryDescription,
}: BuildInputBlocksParams): InputBlock[] => {
  const inputContent: { type: "input_text"; text: string }[] = [
    {
      type: INPUT_TEXT_CONTENT_TYPE,
      text: intro,
    },
    { type: INPUT_TEXT_CONTENT_TYPE, text: JSON.stringify(payload) },
  ];

  if (repositoryDescription) {
    inputContent.push({
      type: INPUT_TEXT_CONTENT_TYPE,
      text: `리포지토리 설명(참고용): ${repositoryDescription}`,
    });
  }

  return inputContent;
};

export default createInputBlocks;
