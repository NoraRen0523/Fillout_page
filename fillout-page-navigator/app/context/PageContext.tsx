import React, { createContext, useState, useContext, ReactNode } from "react";
import { Page, ContextMenuState, PageContextType } from "../types";

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

interface PageProviderProps {
  children: ReactNode;
}

export default function PageProvider({ children }: PageProviderProps) {
  const [pages, setPages] = useState<Page[]>([
    { id: "1", title: "Info", active: true },
    { id: "2", title: "Details", active: false },
    { id: "3", title: "Other", active: false },
    { id: "4", title: "Ending", active: false },
  ]);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    pageId: null,
    x: 0,
    y: 0,
  });

  const addPage = (insertIndex: number) => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: `Page ${pages.length + 1}`,
      active: false,
    };

    const newPages = [
      ...pages.slice(0, insertIndex),
      newPage,
      ...pages.slice(insertIndex),
    ];

    setPages(newPages);
  };

  const movePage = (fromIndex: number, toIndex: number, isDelay = false) => {
    if (fromIndex === toIndex) return;

    const newPages = [...pages];
    const [movedPage] = newPages.splice(fromIndex, 1);
    newPages.splice(toIndex, 0, movedPage);
    if (isDelay) {
      setTimeout(() => {
        setPages(newPages);
      });
    } else {
      setPages(newPages);
    }
  };

  const setActivePage = (id: string) => {
    setPages(
      pages.map((p) => ({
        ...p,
        active: p.id === id,
      }))
    );
  };

  const deletePage = (id: string, isDelay = false) => {
    if (pages.length <= 1) return;

    const newPages = pages.filter((p) => p.id !== id);
    if (newPages.length > 0 && !newPages.some((p) => p.active)) {
      newPages[0].active = true;
    }
    // Click to render does not work, delayed works
    if (isDelay) {
      setTimeout(() => {
        setPages(newPages);
      });
    } else {
      setPages(newPages);
    }
  };

  const duplicatePage = (id: string, isDelay = false) => {
    const pageToDuplicate = pages.find((p) => p.id === id);
    if (!pageToDuplicate) return;

    const insertIndex = pages.findIndex((p) => p.id === id) + 1;
    const newPage: Page = {
      id: Date.now().toString(),
      title: `${pageToDuplicate.title} (copy)`,
      active: false,
    };

    const newPages = [
      ...pages.slice(0, insertIndex),
      newPage,
      ...pages.slice(insertIndex),
    ];
    if (isDelay) {
      setTimeout(() => {
        setPages(newPages);
      });
    } else {
      setPages(newPages);
    }
  };

  const renamePage = (id: string, newTitle: string) => {
    setPages(pages.map((p) => (p.id === id ? { ...p, title: newTitle } : p)));
  };

  const openContextMenu = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      pageId,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const contextValue: PageContextType = {
    pages,
    addPage,
    movePage,
    setActivePage,
    deletePage,
    duplicatePage,
    renamePage,
    contextMenu,
    openContextMenu,
    closeContextMenu,
  };

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}
