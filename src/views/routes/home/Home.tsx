import React, { useEffect, useState } from "react";
import {
  validateEmailFormat,
  validateMatching,
  validateMinLength,
} from "utils";
import { Alert, Button, Field, Loader, Modal } from "views/components";
import { FullHeight } from "views/layouts";

const Home: React.FC = () => {
  const fullNameMinLength = 3;

  const invalidMessage = {
    minLength: `This field needs to be at least ${fullNameMinLength} characters long.`,
    emailFormat: "This email isn't valid.",
    matchingEmail: "This email doesn't match the one provided above.",
  };

  // Forms states
  const [callAPI, setCallAPI] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState<{ errorMessage?: string }>();

  // Fields values
  const [fullNameValue, setFullName] = useState<string>();
  const [emailValue, setEmailValue] = useState<string>();
  const [emailConfirmationValue, setEmailConfirmationValue] = useState<
    string
  >();

  // Fields validation states
  const [fullNameValidity, setFullNameValidity] = useState({
    showMessage: false,
    hasValidMinLength: false,
  });
  const [emailValidity, setEmailValidity] = useState({
    showMessage: false,
    isValidEmailFormat: false,
  });
  const [emailConfirmationValidity, setEmailConfirmationValidity] = useState({
    showMessage: false,
    isMatchingEmail: false,
  });

  // Field handlers
  const handleFullName = (event: React.FormEvent<HTMLInputElement>) => {
    setFullName(event.currentTarget.value);

    setFullNameValidity({
      showMessage: true,
      hasValidMinLength: validateMinLength(
        event.currentTarget.value,
        fullNameMinLength
      ),
    });
  };

  const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);

    setEmailValidity({
      showMessage: true,
      isValidEmailFormat: validateEmailFormat(event.currentTarget.value),
    });

    setEmailConfirmationValidity({
      showMessage: emailConfirmationValidity.showMessage,
      isMatchingEmail: validateMatching(
        event.currentTarget.value,
        emailConfirmationValue || ""
      ),
    });
  };

  const handleEmailConfirmation = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setEmailConfirmationValue(event.currentTarget.value);

    setEmailConfirmationValidity({
      showMessage: true,
      isMatchingEmail: validateMatching(
        emailValue || "",
        event.currentTarget.value
      ),
    });
  };

  // Form handler
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFullNameValidity({
      showMessage: true,
      hasValidMinLength: fullNameValidity.hasValidMinLength,
    });
    setEmailValidity({
      showMessage: true,
      isValidEmailFormat: emailValidity.isValidEmailFormat,
    });
    setEmailConfirmationValidity({
      showMessage: true,
      isMatchingEmail: emailConfirmationValidity.isMatchingEmail,
    });

    fullNameValidity.hasValidMinLength &&
      emailValidity.isValidEmailFormat &&
      emailConfirmationValidity.isMatchingEmail &&
      setCallAPI(true);
  };

  // Conditional API call
  useEffect(() => {
    callAPI &&
      fetch(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        {
          method: "POST",
          body: JSON.stringify({ name: fullNameValue, email: emailValue }),
        }
      )
        .then((response) => response.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setResult(data);
            setCallAPI(false);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
            setCallAPI(false);
          }
        );
  }, [callAPI, emailValue, fullNameValue]);

  const APIResponse = () => {
    if (error) {
      return (
        <Alert variant="danger" closable position="fixed-bottom-right">
          {JSON.stringify(error)}
        </Alert>
      );
    } else if (!isLoaded) {
      return null;
    } else {
      return result?.errorMessage ? (
        <Alert variant="warning" closable position="fixed-bottom-right">
          {result?.errorMessage}
        </Alert>
      ) : (
        <Alert variant="success" closable position="fixed-bottom-right">
          {result}
        </Alert>
      );
    }
  };

  return (
    <FullHeight>
      <h1>A better way to enjoy every day.</h1>

      <p>Be the first to know when we launch.</p>

      <Modal triggerLabel="Request an invite">
        <form onSubmit={handleFormSubmit}>
          <h3>Request an invite</h3>

          <Field
            label="Full name"
            type="text"
            name="name"
            attributes={{
              required: true,
              minLength: 3,
              defaultValue: fullNameValue,
              onChange: (event: React.FormEvent<HTMLInputElement>) =>
                handleFullName(event),
            }}
          >
            {fullNameValidity.showMessage &&
              !fullNameValidity.hasValidMinLength &&
              invalidMessage.minLength}
          </Field>

          <Field
            label="Email"
            type="email"
            name="email"
            attributes={{
              required: true,
              defaultValue: emailValue,
              onChange: (event: React.FormEvent<HTMLInputElement>) =>
                handleEmail(event),
            }}
          >
            {emailValidity.showMessage &&
              !emailValidity.isValidEmailFormat &&
              invalidMessage.emailFormat}
          </Field>

          {/* Email "usedemail@airwallex.com" is hardcoded in the backend to trigger a specific error */}

          <Field
            label="Confirm Email"
            type="email"
            name={undefined}
            attributes={{
              required: true,
              defaultValue: emailConfirmationValue,
              onChange: (event: React.FormEvent<HTMLInputElement>) =>
                handleEmailConfirmation(event),
            }}
          >
            {emailConfirmationValidity.showMessage &&
              !emailConfirmationValidity.isMatchingEmail &&
              invalidMessage.matchingEmail}
          </Field>

          <Button type="submit" block>
            {callAPI && <Loader color="white" />} Send
          </Button>

          {isLoaded && <APIResponse />}
        </form>
      </Modal>
    </FullHeight>
  );
};

export default Home;
