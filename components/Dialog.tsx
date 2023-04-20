import type { PropsWithChildren } from "react";

import { Button } from "./Button";

interface DialogProp {
  displayCloseBtn?: boolean;
  onBtnClick?: () => void;
}

export function Dialog({
  displayCloseBtn = true,
  onBtnClick,
  children,
}: PropsWithChildren<DialogProp>) {
  return (
    <>
      <div
        data-testid="dialog-overlay"
        className="h-screen w-screen fixed top-0 left-0 bg-neutral-950 opacity-50"
      ></div>
      <div
        data-testid="dialog-container"
        className="w-[80%] sm:w-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-neutral-700 p-4"
      >
        {displayCloseBtn && (
          <Button
            testId="dialog-close"
            className="rounded-full px-2 py-0 absolute top-3 right-3"
            onClick={onBtnClick}
          >
            &#10799;
          </Button>
        )}
        {children}
      </div>
    </>
  );
}
