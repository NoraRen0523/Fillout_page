import React from "react";
import { Plus } from "lucide-react";
import { usePageContext } from "@/context/PageContext";
import { PageContextType, AddPageButtonProps } from "@/types";

export default function AddPageButton({ insertIndex }: AddPageButtonProps) {
  const { addPage } = usePageContext() as PageContextType;

  return (
    <div className="flex items-center">
      <div
        className={`relative font-medium flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 opacity-100 bg-white border border-[#e1e1e1] shadow-[0px_1px_3px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.02)] text-sm text-[#1a1a1a]`}
        onClick={() => addPage(insertIndex)}
      >
        <Plus size={16} />
        Add page
      </div>
    </div>
  );
}
