import React, { Fragment } from "react";
import { Box, FormField, TextInput } from "grommet";
import { login } from "../../requests/authentication/login";
import { IUserCredentials } from "../../requests/authentication/types";
import Button from "../../ui-components/button/button";
import { LoginTitle, StyledForm } from "./login-form.style";
import { errorToast } from "../../ui-components/toasts/toasts";
import { startSession } from "../../utils/session";

interface ILoginForm {}

const LoginForm: React.FC<ILoginForm> = () => {
  const handleSubmit = (values: IUserCredentials | any) => {
    login(values)
      .then((result) => {
        startSession(result.token);
      })
      .catch((result) => {
        if (result.message === "401") {
          errorToast("Senha incorreta.");
        } else {
          errorToast("Email não encontrado");
        }
      });
  };

  return (
    <Fragment>
      <LoginTitle>Olá! Faça seu login.</LoginTitle>
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
