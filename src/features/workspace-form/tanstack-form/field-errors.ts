function getFieldErrorText(errors?: readonly unknown[]) {
  if (!errors) {
    return undefined;
  }

  for (const error of errors) {
    if (typeof error === "string" && error) {
      return error;
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      return error.message;
    }
  }

  return undefined;
}

function shouldShowFieldError(isTouched: boolean, submissionAttempts: number) {
  return isTouched || submissionAttempts > 0;
}

export { getFieldErrorText, shouldShowFieldError };
