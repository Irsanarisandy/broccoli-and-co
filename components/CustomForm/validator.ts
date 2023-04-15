export function isFullNameValid(fullName: string) {
  return fullName.trim().length >= 3;
}

export function isEmailValid(email: string) {
  const emailRegex = new RegExp(/^[\w+.-]+@[\w-]+[A-Za-z.]*\.[A-Za-z]+$/, "g");
  return emailRegex.test(email);
}

export function isConfirmationEmailValid(
  email: string,
  confirmationEmail: string
) {
  return email === confirmationEmail;
}
