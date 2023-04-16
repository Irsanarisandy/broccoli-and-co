import { type FormEvent, useState } from "react";
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

export async function postInviteFormData(
  _: string,
  {
    arg,
  }: {
    arg: PostArgProp;
  }
) {
  const { name, email, onValidSubmit, setErrorMessage } = arg;

  // the mentioned API is in the pages/api/invite.ts file,
  // which uses the mentioned API in pdf file
  await fetch("/api/invite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation {
        postInviteFormData(name: "${name}", email: "${email}") {
          status,
          message
        }
      }`,
    }),
  })
    .then((response) =>
      response.json().then((res) => res.data.postInviteFormData)
    )
    .then((result) => {
      const { status, message } = result;
      switch (status) {
        case 200:
          onValidSubmit();
          break;
        case 400:
          setErrorMessage(message);
          break;
      }
    })
    .catch((error) => console.log(JSON.stringify(error)));
}

export function RequestInviteForm({ onValidSubmit }: FormProp) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [validFullName, setValidFullName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validConfirmationEmail, setValidConfirmationEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { trigger, isMutating, error } = useSWRMutation(
    "postInviteFormData",
    postInviteFormData
  );

  const checkValidity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const resValidFullName = isFullNameValid(fullName);
    const resValidEmail = isEmailValid(email);
    const resValidConfirmationEmail = isConfirmationEmailValid(
      email,
      confirmationEmail
    );
    setValidFullName(resValidFullName);
    setValidEmail(resValidEmail);
    setValidConfirmationEmail(resValidConfirmationEmail);
    if (resValidFullName && resValidEmail && resValidConfirmationEmail) {
      trigger({
        name: fullName,
        email,
        onValidSubmit,
        setErrorMessage,
      });
    }
  };

  return (
    <form
      data-testid="invite-form"
      className="flex flex-col"
      onSubmit={checkValidity}
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
          onChange={(event) => setFullName(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setConfirmationEmail(event.target.value)}
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
          label={!isMutating ? "Send" : "Sending, please wait..."}
          disabled={isMutating}
          classes="w-full"
        />
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
