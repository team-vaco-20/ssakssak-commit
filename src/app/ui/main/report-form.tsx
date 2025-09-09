"use client";

import { useEffect, useState } from "react";
import { InputField } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import { Textarea } from "@/app/ui/common/textarea";
import { Button } from "@/app/ui/common/button";
import RepositoryBranchSelector from "@/app/ui/main/repository-branch-selector";
import ErrorMessage from "@/app/ui/common/error-message";
import { SYSTEM_ERROR_MESSAGES } from "@/constants/error-messages";
import { useRouter } from "next/navigation";
import { useReportHistory } from "@/hooks/useVerifiedContext";

function ReportForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const { selected } = useReportHistory();
  const [reportTitle, setReportTitle] = useState<string>("");
  const [repositoryOverview, setRepositoryOverview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const syncedTitle = selected?.reportTitle ?? "";
    const syncedOverview = selected?.repositoryOverview ?? "";

    setReportTitle(syncedTitle);
    setRepositoryOverview(syncedOverview);
  }, [selected]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setErrorMessage(null);
      setIsSubmitting(true);

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
        setIsSubmitting(false);
        return;
      }

      router.push("/loading");

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resultData = await response.json();

      if (!response.ok) {
        const errorMessage = resultData.error.message ?? "요청에 실패했습니다.";
        alert(errorMessage);
        router.replace("/");
        setIsSubmitting(false);

        return;
      }

      const { result } = resultData;
      const id = crypto.randomUUID();
      sessionStorage.setItem(`guest:report:${id}`, JSON.stringify(result));

      router.replace(`/report-view/${id}`);
    } catch {
      setErrorMessage(SYSTEM_ERROR_MESSAGES.NETWORK);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-14 flex w-full max-w-3xl flex-col gap-12 rounded-xl bg-white p-10 pt-20 break-words break-keep"
    >
      <fieldset disabled={isSubmitting} className="contents">
        <InputField
          id="reportTitle"
          name={"reportTitle"}
          label={"리포트명"}
          placeholder={"생성할 리포트명을 입력해 주세요."}
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
        />
        <div className="grid gap-3">
          <Label className="text-base font-medium text-neutral-800">
            리포지토리 개요
          </Label>
          <Textarea
            value={repositoryOverview}
            name="repositoryOverview"
            className="min-h-[140px] rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none"
            placeholder={`예시: 이 과제는 GitHub API를 활용해 저장소 브랜치와 커밋 내역을 조회하는 기능을 구현하는 과제입니다.\n예시: 주된 목적은 API 연동과 비동기 처리 역량을 확인하는 것입니다.`}
            onChange={(e) => setRepositoryOverview(e.target.value)}
          />
        </div>

        <RepositoryBranchSelector />

        <div className="fixed right-0 bottom-15 left-0 bg-white">
          <div className="mx-auto max-w-3xl px-5 py-4">
            <Button
              type="submit"
              className="h-12 w-full rounded-lg bg-neutral-900 text-base font-semibold text-white shadow-sm hover:bg-neutral-600 focus:ring-2 focus:ring-neutral-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? "리포트 생성 요청 중..." : "리포트 생성"}
            </Button>
          </div>
        </div>

        {errorMessage ? (
          <ErrorMessage
            className="whitespace-normal"
            message={`${errorMessage}`}
          ></ErrorMessage>
        ) : null}
      </fieldset>
    </form>
  );
}

export default ReportForm;
