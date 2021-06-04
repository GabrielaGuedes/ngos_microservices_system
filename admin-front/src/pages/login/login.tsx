import React, { useEffect, useState } from "react";
import LoginForm from "../../components/login/login-form";
import { canSelfRegister } from "../../requests/authentication/can-self-register";
import { Title } from "../../ui-components/typography";
import { LoginCard, LoginPageContainer } from "./login.style";

interface ILogin {}

const Login: React.FC<ILogin> = () => {
  const [isFirstUser, setIsFirstUser] = useState<boolean>();

  useEffect(() => {
    canSelfRegister()
      .then((requestResult) => {
        setIsFirstUser(requestResult.canSelfRegister);
      })
      .catch(() => setIsFirstUser(false));
  }, []);

  return (
    <LoginPageContainer>
      <Title>Nome da ONG</Title>
      <LoginCard>
        {isFirstUser ? <div>Signup form</div> : <LoginForm />}
      </LoginCard>
    </LoginPageContainer>
  );
};

export default Login;
