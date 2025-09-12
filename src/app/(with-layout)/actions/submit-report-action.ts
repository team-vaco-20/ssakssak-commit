"use server";

import {
  DATA_ERROR_MESSAGES,
  SYSTEM_ERROR_MESSAGES,
} from "@/constants/error-messages";
import { ReportFormState } from "@/types/report";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function submitReportAction(
  prevState: unknown,
  formData: FormData,
): Promise<ReportFormState> {
  const body = {
    reportTitle: String(formData.get("reportTitle") ?? "").trim(),
    repositoryOverview: String(formData.get("repositoryOverview") ?? "").trim(),
    repositoryUrl: String(formData.get("repositoryUrl") ?? "").trim(),
    branch: String(formData.get("branch") ?? "").trim(),
    reportHistoryId: formData.get("reportHistoryId")
      ? String(formData.get("reportHistoryId"))
      : null,
  };

  if (!body.repositoryUrl || !body.branch) {
    return {
      ok: false,
      formError: "리포지토리 URL과 브랜치를 모두 선택해 주세요.",
    };
  }

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = await response.json();

  if (!response.ok) {
    const message = json?.error?.message ?? DATA_ERROR_MESSAGES.READ;
    return { ok: false, formError: message };
  }

  const jobId: string | undefined = json?.jobId;
  if (!jobId) {
    return { ok: false, formError: SYSTEM_ERROR_MESSAGES.UNKNOWN };
  }

  const cookieStore = await cookies();
  cookieStore.set("jobId", jobId, {
    path: "/loading",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 5,
  });

  redirect("/loading");
}
