import { InputField } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import { Textarea } from "@/app/ui/common/textarea";
import { ComboboxPopover } from "@/app/ui/common/combobox";
import InputRepository from "@/app/ui/main/input-repository";
import branches from "@/mocks/branches.json";

const InputList = () => {
  return (
    <div className="mb-10 flex w-full flex-col gap-10">
      <InputField
        id={"reportName"}
        label={"리포트명"}
        placeholder={"생성할 리포트명을 입력해 주세요."}
      />

      <div className="grid gap-3">
        <Label>요구사항 및 분석 가이드</Label>
        <Textarea placeholder={`1. OOO을 구현하세요.\n2. OOO을 구현하세요.`} />
      </div>

      <InputRepository />

      <ComboboxPopover items={branches}>브랜치</ComboboxPopover>
    </div>
  );
};

export default InputList;
