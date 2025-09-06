"use client";

import parse from "html-react-parser";
import useRenderMermaid from "@/app/ui/report-view/useRenderMermaid";
import { MermaidProps } from "@/app/types/mermaid";

function Mermaid({ chart, title, description, config }: MermaidProps) {
  const { svg, error } = useRenderMermaid(chart, config);

  if (error) {
    return <div className="whitespace-pre-line text-amber-800">{error}</div>;
  }

  return (
    <main className="w-full p-6">
      <h1 className="mb-4 text-left text-xl font-semibold">{title}</h1>
      <article className="space-y-4">
        <p className="text-left">{description}</p>
        <div className="flex justify-center">{parse(svg)}</div>
      </article>
    </main>
  );
}

export default Mermaid;
