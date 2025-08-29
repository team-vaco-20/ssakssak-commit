import InputList from "@/app/ui/main/input-list";
import Header from "@/app/ui/common/header";
import { Button } from "@/app/ui/common/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="px-[10%]">
      <Header>ssakssack commit</Header>

      <InputList />
      <Button type="submit">
        <Link href={"/loading"}>생성</Link>
      </Button>
    </div>
  );
};

export default Page;
