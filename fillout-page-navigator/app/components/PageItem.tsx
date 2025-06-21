import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Page } from "@/types";
import { FileText } from "lucide-react";

interface PageItemProps {
  page: Page;
  index: number;
  onActivate: (id: string) => void;
  movePage: (fromIndex: number, toIndex: number) => void;
  children: React.ReactNode;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const PageItem: React.FC<PageItemProps> = ({
  page,
  index,
  onActivate,
  movePage,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "PAGE",
    item: { index, id: page.id, type: "PAGE" } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "PAGE",
    hover: (draggedItem: DragItem) => {
      if (draggedItem.index === index) return;
      movePage(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  drag(drop(ref));

  const handleClick = () => {
    onActivate(page.id);
  };

  return (
    <div>
      <div className="flex items-center" ref={ref}>
        {/* animation effects transition-all duration-200 */}
        <div
          tabIndex={0}
          className={`group relative flex items-center px-3 py-2 rounded-lg cursor-pointer
          ${isDragging ? "opacity-50" : "opacity-100"}
          ${
            page.active
              ? "bg-white border border-[#e1e1e1] shadow-[0px_1px_3px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.02)]"
              : "bg-[rgba(157,164,178,0.15)] hover:bg-[rgba(157,164,178,0.35)]"
          }
          ${
            page.title === "Focused"
              ? "border border-[#2f72e2] shadow-[0px_1px_3px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.02),0px_0px_0px_1.5px_rgba(47,114,226,0.25)]"
              : ""
          }`}
          onClick={handleClick}
        >
          <span className={`group-item ${page.active ? "text-[#f59d0e]" : ""}`}>
            <FileText size={16} />
          </span>

          <span
            className={`text-sm font-medium ml-2 ${
              page.active || page.title === "Focused"
                ? "text-[#1a1a1a]"
                : "text-[#677289]"
            }`}
          >
            {page.title}
          </span>
          {children}
        </div>
        <div className="w-6 h-px border border-dashed border-[#c0c0c0] mx-1"></div>
      </div>
    </div>
  );
};

export default PageItem;
