"use client";

import { useState } from "react";
import { Button } from "@/app/ui/common/button";
import { Input } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import ErrorMessage from "@/app/ui/common/error-message";

type InputRepositoryProps = {
  onBranchesFetched: (branches: string[]) => void;
};

const GITHUB_REPOSITORY_REGEX =
  /^(https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\.git)?\/?$|git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-])$/;

const InputRepository = ({ onBranchesFetched }: InputRepositoryProps) => {
  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string) => {
    return GITHUB_REPOSITORY_REGEX.test(url);
  };

  const handleClick = async () => {
    if (!validateUrl(repositoryUrl)) {
      setError("유효한 리포지토리 URL이 아닙니다.");
      return;
    }
    setError(null);

    try {
      const res = await fetch(
        `/api/branches/repositoryUrl=${encodeURIComponent(repositoryUrl)}`,
      );

      if (!res.ok) {
        throw new Error("브랜치 조회 실패");
      }
      const data = await res.json();
      onBranchesFetched(data);
    } catch (err) {
      console.error(err);
      setError("브랜치를 불러오는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div id="repositoryUrl" className="grid w-full gap-2">
      <div className="flex items-center justify-between">
        <Label>리포지토리 URL</Label>
        <Button onClick={handleClick} type="button">
          제출
        </Button>
      </div>

      <Input
        id="repository"
        required
        onChange={(e) => setRepositoryUrl(e.target.value)}
        placeholder="https://github.com/{리포지토리 소유자}/{리포지토리 이름}"
      />

      {error ? <ErrorMessage message={`${error}`}></ErrorMessage> : null}
    </div>
  );
};

export default InputRepository;
