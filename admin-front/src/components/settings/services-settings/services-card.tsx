import React, { Fragment, useEffect, useState } from "react";
import { getServices } from "../../../requests/settings/get-services-config";
import { IServicesConfig } from "../../../requests/settings/types";
import { updateServicesConfig } from "../../../requests/settings/update-services-config";
import BaseCard from "../../../ui-components/base-card/base-card";
import Button from "../../../ui-components/buttons/button";
import CheckBoxGroupField from "../../../ui-components/checkbox-group-field/checkbox-group-field";
import { errorToast, successToast } from "../../../ui-components/toasts/toasts";
import { serviceMapper } from "../../../utils/mappers/service-mapper";
import { ButtonContainer, ServicesCardContainer } from "./services-card.style";
import LoadingBox from "../../../ui-components/loading-box/loading-box";

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
    <ServicesCardContainer>
      <BaseCard title="Serviços">
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
          <LoadingBox pad="xlarge" />
        )}
      </BaseCard>
    </ServicesCardContainer>
  );
};

export default ServicesCard;
