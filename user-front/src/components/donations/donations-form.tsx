import {
  DateInput,
  Form,
  FormField,
  MaskedInput,
  TextArea,
  TextInput,
} from "grommet";
import React, { useState } from "react";
import { chargeCreditCard } from "../../requests/donations/charge-credit-card";
import { IChargeCreditCard } from "../../requests/donations/types";
import {
  HalfFieldContainer,
  TupleFieldContainer,
} from "../../ui-components/base-containers/base-containers";
import Button from "../../ui-components/button/button";
import { EMOJIS } from "../../ui-components/icons/emojis";
import { errorToast, successToast } from "../../ui-components/toasts/toasts";
import { ButtonContainer } from "./donations-form.style";

interface IDonationsForm {}

const DonationsForm: React.FC<IDonationsForm> = () => {
  const [formValues, setFormValues] = useState<IChargeCreditCard | any>();
  const [loading, setLoading] = useState<boolean>(false);

  const formattedValues = () => {
    return {
      ...formValues,
      phone: formValues.phone ? parseInt(formValues.phone) : null,
      cvv: parseInt(formValues.cvv),
      creditCardNumber: parseInt(
        formValues.creditCardNumber.replace(/\s/g, "")
      ),
      donatedValue: parseFloat(formValues.donatedValue),
    };
  };

  const handleSubmit = () => {
    setLoading(true);
    chargeCreditCard(formattedValues())
      .then(() => {
        successToast("Doação realizada com sucesso!");
        setFormValues(null);
        setLoading(false);
      })
      .catch(() => {
        errorToast(
          "Ops, ocorreu algum erro. Cheque os dados informados e tente novamente"
        );
        setLoading(false);
      });
  };

  return (
    <Form
      validate="blur"
      value={formValues}
      onChange={(nextValue) => setFormValues(nextValue)}
      messages={{ required: "Obrigatório" }}
      onSubmit={handleSubmit}
    >
      <TupleFieldContainer>
        <HalfFieldContainer>
          <FormField label="Nome" name="name" required>
            <TextInput name="name" placeholder="João da Silva" />
          </FormField>
          <FormField label="Data de nascimento" name="birthDate" required>
            <DateInput
              name="birthDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
          <FormField label="Email" name="email" required>
            <TextInput name="email" placeholder="email@mail.com" type="email" />
          </FormField>
          <FormField label="Endereço" name="address" required>
            <TextInput name="address" placeholder="Rua Qualquer, 10" />
          </FormField>
          <FormField label="Cidade" name="city" required>
            <TextInput name="city" placeholder="São Paulo" />
          </FormField>
          <FormField label="Estado (UF)" name="state" required>
            <MaskedInput
              mask={[
                {
                  length: 2,
                  regexp: /^[A-Za-z]{1,2}$/,
                  placeholder: "SP",
                },
              ]}
              name="state"
            />
          </FormField>
          <FormField label="Country" name="country" required>
            <TextInput name="country" placeholder="Brasil" />
          </FormField>
        </HalfFieldContainer>
        <HalfFieldContainer>
          <FormField label="Valor doado" name="donatedValue" required>
            <TextInput name="donatedValue" placeholder="10,00" type="number" />
          </FormField>
          <FormField label="Número do cartão" name="creditCardNumber" required>
            <MaskedInput
              mask={[
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: "xxxx",
                },
                { fixed: " " },
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: "xxxx",
                },
                { fixed: " " },
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: "xxxx",
                },
                { fixed: " " },
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: "xxxx",
                },
              ]}
              name="creditCardNumber"
            />
          </FormField>
          <FormField label="CVV" name="cvv" required>
            <MaskedInput
              mask={[
                {
                  length: 3,
                  regexp: /^[0-9]{1,3}$/,
                  placeholder: "xxx",
                },
              ]}
              name="cvv"
            />
          </FormField>
          <FormField label="Mês de validade" name="expireMonth" required>
            <MaskedInput
              mask={[
                {
                  length: 2,
                  regexp: /^[0-9]{1,2}$/,
                  placeholder: "xx",
                },
              ]}
              name="expireMonth"
            />
          </FormField>
          <FormField label="Ano de validade" name="expireYear" required>
            <MaskedInput
              mask={[
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: "xxxx",
                },
              ]}
              name="expireYear"
            />
          </FormField>
          <FormField label="Profissão" name="occupation">
            <TextInput name="occupation" placeholder="Desenvolvedora" />
          </FormField>
          <FormField label="Celular" name="phone">
            <MaskedInput
              mask={[
                { fixed: "+" },
                {
                  length: 2,
                  regexp: /^[0-9]{1,2}$/,
                  placeholder: "xx",
                },
                { fixed: " " },
                { fixed: "(" },
                {
                  length: 2,
                  regexp: /^[0-9]{1,2}$/,
                  placeholder: "xx",
                },
                { fixed: ")" },
                { fixed: " " },
                {
                  length: 5,
                  regexp: /^[0-9]{1,5}$/,
                  placeholder: "xxxxx",
                },
                { fixed: "-" },
                {
                  length: 4,
                  regexp: /^[0-9]{1,4}$/,
                  placeholder: "xxxx",
                },
              ]}
              name="phone"
            />
          </FormField>
        </HalfFieldContainer>
      </TupleFieldContainer>
      <FormField
        label="O que te motivou a realizar a doação?"
        name="motivation"
      >
        <TextArea
          name="motivation"
          placeholder="Quero doar porque bla bla bla"
        />
      </FormField>
      <ButtonContainer>
        <Button type="submit" disabled={loading}>
          Doar {EMOJIS.heartFace}
        </Button>
      </ButtonContainer>
    </Form>
  );
};

export default DonationsForm;
