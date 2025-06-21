// Page object type
export interface Page {
  id: string;
  title: string;
  active: boolean;
}

// Context menu state
export interface ContextMenuState {
  visible: boolean;
  pageId: string | null;
  x: number;
  y: number;
}

// Page context type
export interface PageContextType {
  pages: Page[];
  addPage: (insertIndex: number) => void;
  movePage: (fromIndex: number, toIndex: number) => void;
  setActivePage: (id: string) => void;
  deletePage: (id: string) => void;
  duplicatePage: (id: string) => void;
  renamePage: (id: string, newTitle: string) => void;
  contextMenu: ContextMenuState;
  openContextMenu: (e: React.MouseEvent, pageId: string) => void;
  closeContextMenu: () => void;
}

// Page item component props
export interface PageItemProps {
  page: Page;
  index: number;
}

// Add page button props
export interface AddPageButtonProps {
  insertIndex: number;
}