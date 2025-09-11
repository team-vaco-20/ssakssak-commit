"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckCircle, GitBranch, Code, BarChart3 } from "lucide-react";
import type { ReportJobData, Phase } from "@/types/sse";
import { mockReportJobData } from "@mocks/data/mockReportJobData";

const phaseLabels: Record<Phase, string> = {
  collecting: "커밋 데이터 수집",
  analyzing: "커밋 분석",
  visualizing: "시각화",
};

const phaseIcons: Record<
  Phase,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  collecting: GitBranch,
  analyzing: Code,
  visualizing: BarChart3,
};

const statusColors = {
  completed: "bg-green-50 border-green-200 text-green-800",
  inProgress: "bg-blue-50 border-blue-200 text-blue-800",
  pending: "bg-gray-50 border-gray-200 text-gray-500",
} as const;

const LoadingPage = () => {
  const [currentJob, setCurrentJob] = useState<ReportJobData>(
    mockReportJobData[0],
  );

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= mockReportJobData.length) {
        clearInterval(interval);
        return;
      }
      setCurrentJob(mockReportJobData[index]);
      index++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const renderPhaseStatus = (phase: Phase) => {
    const order: Phase[] = ["collecting", "analyzing", "visualizing"];
    const currentIndex = order.indexOf(currentJob.phase);
    const phaseIndex = order.indexOf(phase);

    if (phaseIndex < currentIndex) return "completed";
    if (phaseIndex === currentIndex) return "inProgress";
    return "pending";
  };

  const isAllCompleted =
    currentJob.status === "completed" && currentJob.phase === "visualizing";

  return (
    <div className="flex min-h-screen flex-col items-center justify-start pt-20 text-center">
      <Image src="/loading.svg" width={200} height={200} alt="loading" />

      <p className="font-m mt-6 mb-2 text-5xl">Loading</p>
      <p className="mb-10 text-2xl text-neutral-600">
        리포트 결과를 분석 중입니다...
      </p>

      {isAllCompleted ? (
        <div className="flex w-[320px] flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <p className="text-lg font-semibold text-green-800">
            분석이 완료되었습니다.
          </p>
          <p className="text-sm text-green-700">결과 페이지로 이동합니다...</p>
        </div>
      ) : (
        <div className="flex w-[320px] flex-col gap-3">
          {(["collecting", "analyzing", "visualizing"] as Phase[]).map(
            (phase) => {
              const phaseState = renderPhaseStatus(phase);
              const Icon = phaseIcons[phase];

              return (
                <div
                  key={phase}
                  className={`flex items-center rounded-lg border p-3 ${statusColors[phaseState]} transition-all duration-500`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      phaseState === "completed"
                        ? "bg-green-500 text-white"
                        : phaseState === "inProgress"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {phaseState === "completed" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>

                  <div className="ml-3 flex-1 text-left">
                    <p className="font-medium">{phaseLabels[phase]}</p>
                    <p className="text-sm">
                      {phaseState === "completed"
                        ? "완료"
                        : phaseState === "inProgress"
                          ? "진행 중"
                          : "대기 중"}
                    </p>
                  </div>

                  {phaseState === "inProgress" && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  )}
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default LoadingPage;
