import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PageItem from "./PageItem";
import SettingsDropdown from "./SettingsDropdown";
import { usePageContext } from "@/context/PageContext";
import AddPageButton from "./AddPageButton";
import { PageContextType } from "@/types";

const HorizontalNavigator = () => {
  const { pages, deletePage, movePage, duplicatePage, renamePage } =
    usePageContext() as PageContextType;
  const { setActivePage } = usePageContext() as PageContextType;

  return (
    <div className="w-full bg-[#f9fafb] border border-[#e1e1e1] rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.04),0px_1px_1px_rgba(0,0,0,0.02)] p-5">
      <DndProvider backend={HTML5Backend}>
        <div className="flex items-center relative">
          {pages.map((page, index) => (
            <React.Fragment key={page.id}>
              <PageItem
                page={page}
                index={index}
                onActivate={setActivePage}
                movePage={movePage}
              >
                {page.active && (
                  <SettingsDropdown
                    pages={pages}
                    renamePage={renamePage}
                    duplicatePage={duplicatePage}
                    pageId={page.id}
                    onMove={movePage}
                    pageIndex={index}
                    onDeletePage={deletePage}
                  />
                )}
              </PageItem>
            </React.Fragment>
          ))}

          <AddPageButton insertIndex={pages.length} />
        </div>
      </DndProvider>
    </div>
  );
};

export default HorizontalNavigator;
