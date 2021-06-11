import React, { Fragment, useEffect, useState } from "react";
import { getServices } from "../../../requests/settings/get-services-config";
import { IServicesConfig } from "../../../requests/settings/types";
import { updateServicesConfig } from "../../../requests/settings/update-services-config";
import { Button } from "../../../ui-components/buttons/buttons";
import CheckBoxGroupField from "../../../ui-components/checkbox-group-field/checkbox-group-field";
import { errorToast, successToast } from "../../../ui-components/toasts/toasts";
import { serviceMapper } from "../../../utils/service-mapper";
import { ServicesCardStyled, ButtonContainer } from "./services-card.style";

interface IServicesCard {}

const ServicesCard: React.FC<IServicesCard> = () => {
  const [services, setServices] = useState<IServicesConfig>();

  useEffect(() => {
    getServices()
      .then((result) => {
        setServices(result);
      })
      .catch(() => {
        errorToast();
      });
  }, []);

  const handleSave = () => {
    updateServicesConfig(services as IServicesConfig)
      .then(() => {
        successToast("Salvo com sucesso! Vamos recarregar a página...");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => errorToast());
  };

  return (
    <ServicesCardStyled title="Serviços">
      {services ? (
        <Fragment>
          <CheckBoxGroupField
            value={services}
            onChange={(value) => setServices(value)}
            mapper={serviceMapper}
          />
          <ButtonContainer>
            <Button type="submit" onClick={handleSave}>
              Salvar
            </Button>
          </ButtonContainer>
        </Fragment>
      ) : (
        <div> Carregando...</div>
      )}
    </ServicesCardStyled>
  );
};

export default ServicesCard;
