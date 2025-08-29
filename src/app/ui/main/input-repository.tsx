import { Button } from "@/app/ui/common/button";
import { Input } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";

const InputRepository = () => {
  return (
    <div id="repositoryUrl" className="grid w-full gap-2">
      <div className="flex items-center justify-between">
        <Label>리포지토리 URL</Label>
        <Button type="submit">제출</Button>
      </div>
      <Input
        id="repository"
        required
        placeholder="리포지토리 주소를 입력해 주세요."
      />
    </div>
  );
};

export default InputRepository;
