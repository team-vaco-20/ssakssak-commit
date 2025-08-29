"use client";

import { useState } from "react";
import { InputField } from "@/app/ui/common/input";
import { Label } from "@/app/ui/common/label";
import { Textarea } from "@/app/ui/common/textarea";
import { ComboboxPopover } from "@/app/ui/common/combobox";
import InputRepository from "@/app/ui/main/input-repository";
import { Button } from "../common/button";
import Link from "next/link";

const Inputform = () => {
  const [branches, setBranches] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleFetchedBranches = (data: string[]) => {
    setBranches(data);
    setDisabled(false);
  };

  return (
    <form className="mb-10 flex w-full flex-col gap-10">
      <InputField
        id={"reportName"}
        label={"리포트명"}
        placeholder={"생성할 리포트명을 입력해 주세요."}
      />

      <div className="grid gap-3">
        <Label>요구사항 및 분석 가이드</Label>
        <Textarea placeholder={`1. OOO을 구현하세요.\n2. OOO을 구현하세요.`} />
      </div>

      <InputRepository onBranchesFetched={handleFetchedBranches} />

      <ComboboxPopover items={branches.map((b) => ({ value: b }))}>
        브랜치
      </ComboboxPopover>

      <Button type="submit" disabled={disabled}>
        <Link href={"/loading"}>생성</Link>
      </Button>
    </form>
  );
};

export default Inputform;
