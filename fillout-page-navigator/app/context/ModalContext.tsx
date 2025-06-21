// contexts/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// Define Context type
type ModalContextType = {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
};

type ModalConfig = {
  content: ReactNode;
  initialValue?: string;
  onConfirm?: (data: string) => void; // New confirm callback
  showConfirm?: boolean;  // Whether to show confirm button
  confirmText?: string;   // Confirm button text
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Define Provider Props type
type ModalProviderProps = {
  children: ReactNode;
  defaultContent?: ReactNode;
};

export function ModalProvider({ 
  children, 
  defaultContent = (
    <>
      <h3 className="font-bold text-lg">Hello!</h3>
      <p className="py-4">Press ESC key or click outside to close</p>
    </>
  )
}: ModalProviderProps) {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({ 
    content: defaultContent,
    showConfirm: false 
  });
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState("");

  const openModal = useCallback((config: ModalConfig) => {
    setModalConfig({
      showConfirm: true, // Show confirm button by default
      confirmText: 'Confirm', // Default confirm text
      ...config // Allows overriding defaults
    });
    setIsOpen(true);
    setVal(config.initialValue || "");
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleConfirm = () => {
    modalConfig.onConfirm?.(val); // Execute confirm callback
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <dialog open={isOpen} className="modal">
        <div className="modal-box">
        <h3 className='font-bold text-lg mb-4'>Edit Name</h3>  {/* Translated */}
        <div>
          <input
            type="text"
            value={val}
            onChange={(e) => {
              setVal(e.target.value)
            }}
            placeholder="Type here"
            className="input w-full"
          />
        </div>
          <div className="modal-action">
            {/* Confirm button (conditional rendering) */}
            {modalConfig.showConfirm && (
              <button 
                className="btn btn-primary"
                onClick={handleConfirm}
              >
                {modalConfig.confirmText}
              </button>
            )}
            {/* Close button */}
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        {/* Click background to close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </ModalContext.Provider>
  );
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};