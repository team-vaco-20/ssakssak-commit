"use client";

import { useState } from "react";
import { Button } from "@/app/ui/common/button";
import { Input } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import ErrorMessage from "@/app/ui/common/error-message";

const GITHUB_REPOSITORY_REGEX =
  /^(https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\.git)?\/?$|git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-])$/;

const InputRepository = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validateUrl = () => {
    if (!GITHUB_REPOSITORY_REGEX.test(input)) {
      setError("유효한 GitHub 리포지토리 URL 형식이 아닙니다.");
      return;
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateUrl();
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="repositoryUrl"
      className="grid w-full gap-2"
    >
      <div className="flex items-center justify-between">
        <Label>리포지토리 URL</Label>
        <Button type="submit">제출</Button>
      </div>
      <Input
        id="repository"
        required
        onChange={(e) => setInput(e.target.value)}
        placeholder="https://github.com/{리포지토리 소유자}/{리포지토리 이름}"
      />

      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </form>
  );
};

export default InputRepository;
