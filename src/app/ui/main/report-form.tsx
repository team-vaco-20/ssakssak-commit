"use client";

import { useEffect, useState } from "react";
import { InputField } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import { Textarea } from "@/app/ui/common/textarea";
import { Button } from "@/app/ui/common/button";
import RepositoryBranchSelector from "@/app/ui/main/repository-branch-selector";
import ErrorMessage from "@/app/ui/common/error-message";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";
import { useReportHistory } from "@/stores/report-history/hooks";

function ReportForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { selected } = useReportHistory();
  const [reportTitle, setReportTitle] = useState<string>("");
  const [repositoryOverview, setRepositoryOverview] = useState<string>("");

  useEffect(() => {
    const syncedTitle = selected?.reportTitle ?? "";
    const syncedOverView = selected?.repositoryOverview ?? "";

    setReportTitle(syncedTitle);
    setRepositoryOverview(syncedOverView);
  }, [selected]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage(null);
      const formData = new FormData(e.currentTarget);

      const data = {
        reportTitle: String(formData.get("reportTitle") || "").trim(),
        repositoryOverview: String(
          formData.get("repositoryOverview") || "",
        ).trim(),
        repositoryUrl: String(formData.get("repositoryUrl") || "").trim(),
        branch: String(formData.get("branch") || "").trim(),
        reportHistoryId: selected?.reportHistoryId ?? null,
      };

      if (!data.repositoryUrl || !data.branch) {
        setErrorMessage("리포지토리 URL과 브랜치를 모두 선택해 주세요.");
        return;
      }

      const response = await fetch("/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        id="reportTitle"
        name={"reportTitle"}
        label={"리포트명"}
        placeholder={"생성할 리포트명을 입력해 주세요."}
        value={reportTitle}
        onChange={(e) => setReportTitle(e.target.value)}
      />
      <div className="grid gap-3">
        <Label>요구사항 및 분석 가이드</Label>
        <Textarea
          name="repositoryOverview"
          placeholder={`1. OOO을 구현하세요.\n2. OOO을 구현하세요.`}
          value={repositoryOverview}
          onChange={(e) => setRepositoryOverview(e.target.value)}
        />
      </div>

      <RepositoryBranchSelector />
      <Button type="submit">리포트 생성</Button>
      {errorMessage ? (
        <ErrorMessage
          className="whitespace-normal"
          message={`${errorMessage}`}
        ></ErrorMessage>
      ) : null}
    </form>
  );
}

export default ReportForm;
