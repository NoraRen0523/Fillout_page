import React from "react";
import { Flag, FilePenLine, Clipboard, Copy, Trash2, EllipsisVertical } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { useToast } from "../context/ToastContext";
import { Page } from "@/types";

interface SettingsDropdownProps {
  pageId: string;
  pageIndex: number;
  onDeletePage: (id: string, bool?: boolean) => void;
  duplicatePage: (id: string, bool?: boolean) => void;
  renamePage: (pageId: string, newName: string) => void;
  onMove: (fromIndex: number, toIndex: number, bool: boolean) => void;
  pages: Page[];
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  pageId,
  onDeletePage,
  onMove,
  pageIndex,
  duplicatePage,
  renamePage,
  pages,
}) => {
  const { openModal } = useModal();
  const { showToast } = useToast();

  const handleRename = (data: string) => {
    renamePage(pageId, data);
  };

  const handleCopy = async (page: any) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(page));
      showToast({
        content: "Copy successful", // Translated
      });
    } catch (err) {
      if (err instanceof DOMException) {
        showToast({
          content: "Please allow clipboard permissions", // Translated
        });
      }
    }
  };

  const handleAction = (action: string) => {
    const page = pages[pageIndex];
    switch (action) {
      case "first":
        onMove(pageIndex, 0, true);
        break;
      case "delete":
        onDeletePage(page.id, true);
        break;
      case "rename":
        openModal({
          content: <></>,
          initialValue: page.title,
          onConfirm: handleRename,
          showConfirm: true,
        });
        break;
      case "copy":
        handleCopy(page);
        break;
      case "duplicate":
        duplicatePage(page.id, true);
        break;
      default:
        alert(`${action} action for page ${pageId}`);
    }
  };

  return (
    <div className="dropdown dropdown-bottom flex">
      <button
        className="ml-2 text-[#677289] hover:text-[#1a1a1a] cursor-pointer transition-colors"
      >
        <EllipsisVertical size={16} />
      </button>
      <div
        className="dropdown-content bg-white border border-[#e1e1e1] rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.02)] w-56 z-50"
      >
        <div className="bg-[#fafbfc] border-b rounded-tl-xl rounded-tr-xl border-[#e1e1e1] px-3 py-2">
          <h3 className="text-base font-medium text-[#1a1a1a]">Settings</h3>
        </div>

        <div className="p-3">
          {[
            {
              id: "first",
              label: "Set as first page",
              action: "first",
              icon: <Flag size={14} />,
            },
            {
              id: "rename",
              label: "Rename",
              action: "rename",
              icon: <FilePenLine size={14} />,
            },
            {
              id: "copy",
              label: "Copy",
              action: "copy",
              icon: <Clipboard size={14} />,
            },
            {
              id: "duplicate",
              label: "Duplicate",
              action: "duplicate",
              icon: <Copy size={14} />,
            },
            {
              id: "delete",
              label: "Delete",
              action: "delete",
              isDanger: true,
              icon: <Trash2 color="#ef494f" size={14} />,
            },
          ].map((item) => (
            <React.Fragment key={item.id}>
              {item.id === "delete" && (
                <div className="border-t border-[#e1e1e1] my-3"></div>
              )}

              <button
                className={`flex gap-2 cursor-pointer items-center w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                ${
                  item.isDanger
                    ? "text-[#ef494f] hover:bg-[#fef2f2]"
                    : "text-[#1a1a1a] hover:bg-[#f9fafb] icon"
                }`}
                onClick={() => handleAction(item.action)}
              >
                <span className="icon-foucs:text-[#2f72e2] icon-item">{item.icon}</span>
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsDropdown;