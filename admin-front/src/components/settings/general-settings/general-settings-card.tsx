import React from "react";
import { Form, Box, FormField, TextInput } from "grommet";
import BaseCard from "../../../ui-components/base-card/base-card";
import { GeneralSettingsCardContainer } from "./general-settings-card.style";
import Button from "../../../ui-components/button/button";
import { useState } from "react";
import { useEffect } from "react";
import { getDetails } from "../../../requests/settings/get-details-config";
import { IDetailsConfig } from "../../../requests/settings/types";
import { updateDetailsConfig } from "../../../requests/settings/update-details-config";
import { errorToast, successToast } from "../../../ui-components/toasts/toasts";
import LoadingBox from "../../../ui-components/loading-box/loading-box";

interface IGeneralSettingsCard {}

const GeneralSettingsCard: React.FC<IGeneralSettingsCard> = () => {
  const [value, setValue] = useState<IDetailsConfig>();

  useEffect(() => {
    getDetails().then((result) => setValue({ name: result.name }));
  }, []);

  const handleSave = () => {
    updateDetailsConfig(value as IDetailsConfig)
      .then(() => {
        successToast("Salvo com sucesso! Vamos recarregar a página...");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => errorToast());
  };
  return (
    <GeneralSettingsCardContainer>
      <BaseCard title="Geral">
        {value ? (
          <Form
            validate="change"
            value={value}
            onChange={(formValue) => setValue(formValue)}
            onSubmit={() => handleSave()}
            messages={{ required: "Obrigatório" }}
          >
            <FormField label="Nome da ONG" name="name" required>
              <TextInput name="name" type="text" />
            </FormField>
            <Box direction="row" justify="end" margin={{ top: "medium" }}>
              <Button type="submit">Salvar</Button>
            </Box>
          </Form>
        ) : (
          <LoadingBox pad="small" />
        )}
      </BaseCard>
    </GeneralSettingsCardContainer>
  );
};

export default GeneralSettingsCard;
