import { Form, FormField, TextInput, Box } from "grommet";
import React from "react";
import { INewUser } from "../../../requests/authentication/types";
import { AddUserCardContainer } from "./add-user-card.style";
import BaseCard from "../../../ui-components/base-card/base-card";
import { Button } from "../../../ui-components/buttons/buttons";
import { registerUser } from "../../../requests/authentication/register-user";
import { errorToast, successToast } from "../../../ui-components/toasts/toasts";

interface IAddUserCard {}

interface ISignupFormValues extends INewUser {
  confirmPassword: string;
}

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AddUserCard: React.FC<IAddUserCard> = () => {
  const [value, setValue] =
    React.useState<ISignupFormValues | any>(DEFAULT_VALUES);

  const handleSubmit = (value: ISignupFormValues | any) => {
    delete value.confirmPassword;
    registerUser(value)
      .then(() => {
        successToast("Usuário registrado com sucesso!");
        setValue(DEFAULT_VALUES);
      })
      .catch((e: Error) => {
        if (e.message.includes("500")) {
          errorToast(
            "Ops, ocorreu um erro. Talvez este email já esteja em uso."
          );
        } else {
          errorToast();
        }
        setValue({ ...value, confirmPassword: value.password });
      });
  };
  return (
    <AddUserCardContainer>
      <BaseCard title="Adicionar novo usuário">
        <Form
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
            <Button type="submit">Registrar</Button>
          </Box>
        </Form>
      </BaseCard>
    </AddUserCardContainer>
  );
};

export default AddUserCard;
