import type { PropsWithChildren } from "react";

interface DialogProp {
  closeDisplay: () => void;
}

export function Dialog({
  closeDisplay,
  children,
}: PropsWithChildren<DialogProp>) {
  return (
    <>
      <div
        data-testid="dialog-overlay"
        className="h-screen w-screen fixed top-0 left-0 bg-neutral-950 opacity-50"
        onClick={closeDisplay}
      ></div>
      <div
        data-testid="dialog-container"
        className="w-[80%] sm:w-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-neutral-700 p-4"
      >
        {children}
      </div>
    </>
  );
}
