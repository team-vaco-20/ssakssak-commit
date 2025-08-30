"use client";

import { useState } from "react";
import { Button } from "@/app/ui/common/button";
import { Input } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import ErrorMessage from "@/app/ui/common/error-message";
import { GITHUB_REPOSITORY_RULES } from "@/constants/validations";
import {
  GITHUB_REPOSITORY_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";
import { BranchList } from "@/app/types/branch";
import ComboboxPopover from "@/app/ui/common/combobox";

function RepositoryBranchSelector() {
  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [branches, setBranches] = useState<BranchList[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isValidateRepositoryUrl = (url: string) => {
    return GITHUB_REPOSITORY_RULES.REPOSITORY_REGEX.test(url);
  };

  const handleFetchedBranches = async () => {
    setError(null);
    if (!isValidateRepositoryUrl(repositoryUrl.trim())) {
      setError(GITHUB_REPOSITORY_ERROR_MESSAGES.INVALID_URL);
      return;
    }

    try {
      const response = await fetch(
        `/api/branches?repositoryUrl=${repositoryUrl}`,
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage: string | undefined = data?.error?.message;
        setError(errorMessage ?? SYSTEM_ERROR_MESSAGES.SERVER);
        return;
      }

      const branchListOption = data.branches.map((branchName: string) => ({
        id: branchName,
        value: branchName,
      }));

      setBranches(branchListOption);
    } catch {
      setError(SYSTEM_ERROR_MESSAGES.NETWORK);
    }
  };

  return (
    <div className="grid w-full gap-2">
      <div className="flex items-center justify-between">
        <Label>리포지토리 URL</Label>
        <Button onClick={handleFetchedBranches} type="button">
          연결 및 조회
        </Button>
      </div>

      <Input
        required
        onChange={(e) => setRepositoryUrl(e.target.value)}
        placeholder="https://github.com/{리포지토리 소유자}/{리포지토리 이름}"
      />

      {branches.length > 0 && (
        <ComboboxPopover items={branches}>브랜치</ComboboxPopover>
      )}

      {error ? <ErrorMessage message={`${error}`}></ErrorMessage> : null}
    </div>
  );
}

export default RepositoryBranchSelector;
