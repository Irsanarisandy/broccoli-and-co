import React, { type FormEvent, useState } from "react";
import useSWRMutation from "swr/mutation";

import {
  isConfirmationEmailValid,
  isEmailValid,
  isFullNameValid,
} from "./validator";
import { Button } from "../Button";

interface PostArgProp {
  name: string;
  email: string;
  onValidSubmit: () => void;
  setErrorMessage: (message: string) => void;
}

interface FormProp {
  onValidSubmit: () => void;
}

interface TypedProp {
  typedName?: string;
  typedEmail?: string;
  typedConfirm?: string;
}

export async function postInviteFormData(
  url: string,
  {
    arg,
  }: {
    arg: PostArgProp;
  }
) {
  if (url === "") {
    console.error("ERROR: request url is empty");
    return;
  }

  const { onValidSubmit, setErrorMessage, ...body } = arg;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) =>
      response.json().then((data) => ({ status: response.status, data }))
    )
    .then((result) => {
      const { status, data } = result;
      // assuming status 200 will give result "Registered"
      // assuming status 400 will give result "{errorMessage: 'Bad Request: Email is already in use'}"
      switch (status) {
        case 200:
          onValidSubmit();
          break;
        case 400:
          setErrorMessage(data.errorMessage);
          break;
      }
    })
    .catch((error) => console.error(error));
}

export function RequestInviteForm({ onValidSubmit }: FormProp) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [validFullName, setValidFullName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validConfirmationEmail, setValidConfirmationEmail] = useState(true);
  const [disableSend, setDisableSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { trigger, isMutating, error } = useSWRMutation(
    process.env.NEXT_PUBLIC_INVITATION_ENDPOINT || "",
    postInviteFormData
  );

  const checkValidity = ({
    typedName,
    typedEmail,
    typedConfirm,
  }: TypedProp) => {
    const resValidFullName = isFullNameValid(typedName || fullName);
    const resValidEmail = isEmailValid(typedEmail || email);
    const resValidConfirmationEmail = isConfirmationEmailValid(
      typedEmail || email,
      typedConfirm || confirmationEmail
    );
    setValidFullName(resValidFullName);
    setValidEmail(resValidEmail);
    setValidConfirmationEmail(resValidConfirmationEmail);
    return resValidFullName && resValidEmail && resValidConfirmationEmail;
  };

  const onInputChange = (type: "name" | "email" | "confirm", value: string) => {
    let checkProps: TypedProp = {};
    switch (type) {
      case "name":
        setFullName(value);
        checkProps.typedName = value;
        break;
      case "email":
        setEmail(value);
        checkProps.typedEmail = value;
        break;
      case "confirm":
        setConfirmationEmail(value);
        checkProps.typedConfirm = value;
        break;
    }
    if (disableSend) {
      const isValid = checkValidity(checkProps);
      if (isValid) setDisableSend(false);
    }
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const isValid = checkValidity({});
    if (isValid) {
      trigger({
        name: fullName,
        email,
        onValidSubmit,
        setErrorMessage,
      });
    } else {
      setDisableSend(true);
    }
  };

  return (
    <form
      data-testid="invite-form"
      className="flex flex-col"
      onSubmit={onFormSubmit}
    >
      <div className="text-left mb-4">
        <input
          data-testid="input-name"
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          className={`border-2 px-3 py-2 w-full ${
            validFullName ? "border-gray-400" : "border-red-600"
          }`}
          onChange={(event) => onInputChange("name", event.target.value)}
        />
        {!validFullName && (
          <span data-testid="error-name" className="text-red-600">
            Error: must be at least 3 characters!
          </span>
        )}
      </div>
      <div className="text-left mb-4">
        <input
          data-testid="input-email"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          className={`border-2 px-3 py-2 w-full ${
            validEmail ? "border-gray-400" : "border-red-600"
          }`}
          onChange={(event) => onInputChange("email", event.target.value)}
        />
        {!validEmail && (
          <span data-testid="error-email" className="text-red-600">
            Error: invalid email!
          </span>
        )}
      </div>
      <div className="text-left mb-8">
        <input
          data-testid="input-confirm"
          type="text"
          name="confirmationEmail"
          placeholder="Confirm Email"
          value={confirmationEmail}
          className={`border-2 px-3 py-2 w-full ${
            validConfirmationEmail ? "border-gray-400" : "border-red-600"
          }`}
          onChange={(event) => onInputChange("confirm", event.target.value)}
        />
        {!validConfirmationEmail && (
          <span data-testid="error-confirm" className="text-red-600">
            Error: must be the same!
          </span>
        )}
      </div>
      <div className="text-left mb-4">
        <Button
          type="submit"
          disabled={disableSend || isMutating}
          className="w-full px-3 py-2"
        >
          {!isMutating ? "Send" : "Sending, please wait..."}
        </Button>
        {error && (
          <span data-testid="error-send" className="text-red-600">
            Server is down: please try again later!
          </span>
        )}
        {errorMessage !== "" && (
          <span data-testid="error-send" className="text-red-600">
            {errorMessage}
          </span>
        )}
      </div>
    </form>
  );
}
