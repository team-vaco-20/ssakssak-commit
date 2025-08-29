import Spinner from "@/app/ui/common/spinner";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Spinner />
      <p className="pt-10 text-[48px]">Loading</p>
      <p className="text-[24px]">리포트 결과를 분석 중입니다...</p>
    </div>
  );
};

export default LoadingPage;
