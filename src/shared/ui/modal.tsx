"use client";

import { useRouter } from "@/i18n/routing";
import { useEffect, useRef, type ElementRef } from "react";

type ModalProps = {
  children: React.ReactNode;
};

export function Modal({ children }: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 w-screen h-screen bg-black/80 backdrop-blur-sm"
      onClose={onDismiss}
    >
      <div className="relative h-full w-full flex items-start justify-center overflow-y-auto py-8">
        {/* Close button */}
        <button
          onClick={onDismiss}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal content */}
        <div className="relative w-full max-w-[1200px] bg-background rounded-lg shadow-xl mx-4">
          {children}
        </div>
      </div>
    </dialog>
  );
}
