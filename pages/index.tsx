import Head from "next/head";
import React, { useState } from "react";

import { Button } from ".components/Button";
import { Dialog } from ".components/Dialog";
import { RequestInviteForm } from ".components/CustomForm";

interface DialogContentProp {
  pageId: number;
  closeDialog: () => void;
  nextPage: () => void;
}

function DialogContent({ pageId, closeDialog, nextPage }: DialogContentProp) {
  switch (pageId) {
    case 1:
      return <RequestInviteForm onValidSubmit={nextPage} />;
    case 2:
      return (
        <div className="px-4 pt-2">
          <p data-testid="success-message">
            You will be one of the first to experience Broccoli &amp; Co. when
            we launch.
          </p>
          <Button
            testId="close-dialog"
            className="w-full mt-8 mb-4 px-3 py-2"
            onClick={closeDialog}
          >
            OK
          </Button>
        </div>
      );
    default:
      return <></>;
  }
}

export default function Home() {
  const [displayDialog, toggleDisplayDialog] = useState(false);
  const [curPageId, setCurPageId] = useState(1);

  const dialogPages = ["Request an invite", "All done!"];
  const nextPage = () => setCurPageId((prevState) => prevState + 1);
  const openDialog = () => toggleDisplayDialog(true);
  const closeDialog = () => {
    toggleDisplayDialog(false);
    setCurPageId(1);
  };

  return (
    <>
      <Head>
        <title>Broccoli & Co.</title>
      </Head>
      <div className="max-w-[360px] m-auto text-center">
        <h1>A better way to enjoy everyday.</h1>
        <p className="my-4">Be the first to know when we launch.</p>
        <Button className="px-3 py-2" onClick={openDialog}>
          Request an invite
        </Button>
        <Dialog open={displayDialog} onBtnClick={closeDialog}>
          <h3>{dialogPages[curPageId - 1]}</h3>
          <hr className="border-t-2 w-20 mx-auto mt-2 mb-4 sm:mb-8" />
          <DialogContent
            pageId={curPageId}
            closeDialog={closeDialog}
            nextPage={nextPage}
          />
        </Dialog>
      </div>
    </>
  );
}
