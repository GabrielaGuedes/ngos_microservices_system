import React, { useEffect, useState } from "react";
import LoginForm from "../../components/login/login-form";
import SignupForm from "../../components/login/signup-form";
import { canSelfRegister } from "../../requests/authentication/can-self-register";
import { getDetails } from "../../requests/settings/get-details-config";
import BaseCard from "../../ui-components/base-card/base-card";
import { errorToast } from "../../ui-components/toasts/toasts";
import { Title } from "../../ui-components/typography/typography";
import { LoginCardContainer, LoginPageContainer } from "./login.style";

interface ILogin {}

const Login: React.FC<ILogin> = () => {
  const [isFirstUser, setIsFirstUser] = useState<boolean>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    canSelfRegister()
      .then((requestResult) => {
        setIsFirstUser(requestResult.canSelfRegister);
      })
      .catch(() => setIsFirstUser(false));
    getDetails()
      .then((result) => setName(result.name))
      .catch(() => errorToast());
  }, []);

  return (
    <LoginPageContainer>
      <Title>{name}</Title>
      <LoginCardContainer>
        <BaseCard style={{ minWidth: "350px" }}>
          {isFirstUser ? <SignupForm /> : <LoginForm />}
        </BaseCard>
      </LoginCardContainer>
    </LoginPageContainer>
  );
};

export default Login;
