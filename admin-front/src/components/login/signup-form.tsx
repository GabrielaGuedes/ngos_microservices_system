import { Box, FormField, TextInput } from "grommet";
import React, { Fragment } from "react";
import { signup } from "../../requests/authentication/signup";
import { INewUser } from "../../requests/authentication/types";
import Button from "../../ui-components/button/button";
import { errorToast } from "../../ui-components/toasts/toasts";
import { startSession } from "../../utils/session";
import { LoginTitle, StyledForm } from "./login-form.style";

interface ISignupForm {}

interface ISignupFormValues extends INewUser {
  confirmPassword: string;
}

const SignupForm: React.FC<ISignupForm> = () => {
  const [value, setValue] = React.useState<ISignupFormValues | any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (values: ISignupFormValues | any) => {
    delete values.confirmPassword;
    signup(values)
      .then((result) => {
        startSession(result.token);
      })
      .catch(() => {
        errorToast();
      });
  };

  return (
    <Fragment>
      <LoginTitle>Cadastre o primeiro usuário</LoginTitle>
      <StyledForm
        validate="change"
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onSubmit={({ value }) => handleSubmit(value)}
        messages={{ required: "Obrigatório" }}
      >
        <FormField label="Nome" name="name" required>
          <TextInput name="name" />
        </FormField>
        <FormField label="Email" name="email" required>
          <TextInput name="email" type="email" />
        </FormField>
        <FormField label="Senha" name="password" required>
          <TextInput name="password" type="password" />
        </FormField>
        <FormField
          label="Confirme a senha"
          name="confirmPassword"
          required
          validate={[
            {},
            () => {
              if (value.password !== value.confirmPassword)
                return "Senhas estão diferentes";
              return undefined;
            },
          ]}
        >
          <TextInput name="confirmPassword" type="password" />
        </FormField>
        <Box
          direction="row"
          align="center"
          justify="end"
          margin={{ top: "medium" }}
        >
          <Button type="submit">Cadastrar</Button>
        </Box>
      </StyledForm>
    </Fragment>
  );
};

export default SignupForm;
