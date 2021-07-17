import React, { Fragment, useEffect, useState } from "react";
import { getConfigs } from "../../requests/reports/get-configs";
import { IConfigs } from "../../requests/reports/types";
import { updateConfigs } from "../../requests/reports/update-configs";
import Button from "../../ui-components/button/button";
import CheckBoxGroupField from "../../ui-components/checkbox-group-field/checkbox-group-field";
import LoadingBox from "../../ui-components/loading-box/loading-box";
import { errorToast, successToast } from "../../ui-components/toasts/toasts";
import { PageTitle } from "../../ui-components/typography/page-title";
import { reportsConfigsMapper } from "../../utils/mappers/reports-configs-mapper";
import { SaveButton } from "./reports.style";

interface IReports {}

const Reports: React.FC<IReports> = () => {
  const [configs, setConfigs] = useState<IConfigs>();

  useEffect(() => {
    getConfigs()
      .then((result) => {
        setConfigs(result);
      })
      .catch(() => {
        errorToast();
      });
  }, []);

  const handleSave = () => {
    updateConfigs(configs as IConfigs)
      .then(() => {
        successToast();
      })
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Relatórios de transparência - Configurações</PageTitle>
      {configs ? (
        <Fragment>
          <CheckBoxGroupField
            value={configs}
            onChange={(value) => setConfigs(value)}
            mapper={reportsConfigsMapper}
          />
          <SaveButton>
            <Button type="submit" onClick={handleSave}>
              Salvar
            </Button>
          </SaveButton>
        </Fragment>
      ) : (
        <LoadingBox pad="xlarge" />
      )}
    </Fragment>
  );
};

export default Reports;
