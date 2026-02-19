"use client";

import { useRouter } from "@/i18n/routing";
import { ComponentRef, startTransition, useLayoutEffect, useRef } from "react";
import { ViewTransition } from "react";
import { useTranslations } from "next-intl";

type ModalProps = {
  children: React.ReactNode;
};

export function Modal({ children }: ModalProps) {
  const router = useRouter();
  const t = useTranslations("Common");
  const dialogRef = useRef<ComponentRef<"dialog">>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog?.open) {
      dialog?.showModal();
    }
  }, []);

  function onDismiss() {
    startTransition(() => {
      router.back();
    });
  }

  return (
    <ViewTransition
      name="project-modal"
      default="vt-modal"
      enter="vt-modal"
      exit="vt-modal"
      share="vt-modal"
      update="vt-modal"
    >
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-50 w-screen h-screen overflow-hidden"
        onClose={onDismiss}
      >
        <ViewTransition
          name="project-modal-content"
          default="vt-modal-content"
          enter="vt-modal-content"
          exit="vt-modal-content"
          share="vt-modal-content"
          update="vt-modal-content"
        >
          <div className="relative h-full w-full flex items-start justify-center overflow-y-auto py-8">
            <button
              onClick={onDismiss}
              className="fixed top-4 right-4 z-60 rounded-full border border-border/70 bg-background/70 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
              aria-label={t("closeModal")}
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

            <div className="relative w-full max-w-[1200px] bg-background rounded-lg shadow-xl mx-4">
              {children}
            </div>
          </div>
        </ViewTransition>
      </dialog>
    </ViewTransition>
  );
}
