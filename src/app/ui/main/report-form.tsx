"use client";

import { useState } from "react";
import { InputField } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import { Textarea } from "@/app/ui/common/textarea";
import { Button } from "@/app/ui/common/button";
import RepositoryBranchSelector from "@/app/ui/main/repository-branch-selector";
import ErrorMessage from "@/app/ui/common/error-message";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";

function ReportForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage(null);
      const formData = new FormData(e.currentTarget);
      const title = String(formData.get("title") || "").trim();
      const requirements = String(formData.get("requirements") || "").trim();
      const repositoryUrl = String(formData.get("repositoryUrl") || "").trim();
      const branch = String(formData.get("branch") || "").trim();

      const response = await fetch("/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, requirements, repositoryUrl, branch }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error?.message ?? "요청에 실패했습니다.");
      }
    } catch {
      setErrorMessage(SYSTEM_ERROR_MESSAGES.NETWORK);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-10 flex w-full flex-col gap-10">
      <InputField
        id="title"
        name={"title"}
        label={"리포트명"}
        placeholder={"생성할 리포트명을 입력해 주세요."}
      />
      <div className="grid gap-3">
        <Label>요구사항 및 분석 가이드</Label>
        <Textarea
          name="requirements"
          placeholder={`1. OOO을 구현하세요.\n2. OOO을 구현하세요.`}
        />
      </div>

      <RepositoryBranchSelector />
      <Button type="submit">리포트 생성</Button>
      {errorMessage ? (
        <ErrorMessage message={`${errorMessage}`}></ErrorMessage>
      ) : null}
    </form>
  );
}

export default ReportForm;
