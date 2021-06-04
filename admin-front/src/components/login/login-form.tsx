import React, { Fragment } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Box, FormField, TextInput } from "grommet";
import { login } from "../../requests/authentication/login";
import { IUserCredentials } from "../../requests/authentication/types";
import { Button } from "../../ui-components/buttons/buttons";
import { LoginTitle, StyledForm } from "./login-form.style";

interface ILoginForm {}

const LoginForm: React.FC<ILoginForm> = () => {
  const cookies = new Cookies();
  const history = useHistory();

  const handleSubmit = (values: IUserCredentials | any) => {
    login(values)
      .then((result) => {
        cookies.set("accessToken", result.token, { path: "/" });
        history.replace("/tuk");
      })
      .catch((result) => {
        if (result.status !== "500") {
          //TODO: add better toasts/alerts
          alert("ops, senha incorreta");
        } else {
          alert("ops, aconteceu um erro. Tente novamente");
        }
      });
  };

  return (
    <Fragment>
      <LoginTitle>Login</LoginTitle>
      <StyledForm
        validate="blur"
        onSubmit={({ value }) => handleSubmit(value)}
        messages={{ required: "Obrigatório" }}
      >
        <FormField label="Email" name="email" required>
          <TextInput name="email" type="email" />
        </FormField>
        <FormField label="Senha" name="password" required>
          <TextInput name="password" type="password" />
        </FormField>
        <Box
          direction="row"
          align="center"
          justify="between"
          margin={{ top: "medium" }}
        >
          {/* TODO: add forgot password */}
          <div>Esqueceu sua senha?</div>
          <Button type="submit">Entrar</Button>
        </Box>
      </StyledForm>
    </Fragment>
  );
};

export default LoginForm;
