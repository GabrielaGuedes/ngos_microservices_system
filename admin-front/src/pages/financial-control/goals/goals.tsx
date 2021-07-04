import React, { useState, useEffect } from "react";
import { getGoals } from "../../../requests/financial-control/get-goals";
import { IGoal, IGoalFilters } from "../../../requests/financial-control/types";
import { errorToast } from "../../../ui-components/toasts/toasts";
import GoalsGrid from "../../../components/financial-control/goals-grid";
import { Fragment } from "react";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import { PageTitle } from "../../../ui-components/typography/page-title";
import Button from "../../../ui-components/button/button";
import EditCreateGoalModal from "../../../components/financial-control/edit-create-goal-modal";
import { Select } from "grommet";
import { cleanEmptyEntries } from "../../../utils/empty-entries-cleaner";
import { TopItensContainer, NewGoalButton } from "./goals.style";

interface IGoals {}

const Goals: React.FC<IGoals> = () => {
  const [goalsResult, setGoalsResult] = useState<IGoal[]>();
  const [addGoalModalOpen, setAddGoalModalOpen] = useState(false);

  useEffect(() => {
    getGoals()
      .then((res) => setGoalsResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshData = (filter?: IGoalFilters) => {
    const cleanFilters = filter ? cleanEmptyEntries(filter) : {};
    getGoals(cleanFilters)
      .then((res) => setGoalsResult(res))
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Metas</PageTitle>
      <TopItensContainer>
        <NewGoalButton>
          <Button onClick={() => setAddGoalModalOpen(true)}>Nova meta</Button>
          <EditCreateGoalModal
            isOpen={addGoalModalOpen}
            setIsOpen={setAddGoalModalOpen}
            creation
            refreshData={refreshData}
          />
        </NewGoalButton>
        <Select
          clear
          placeholder="Status"
          options={[
            { label: "Apenas atingidas", value: "true" },
            { label: "Apenas pendentes", value: "false" },
          ]}
          labelKey="label"
          valueKey="value"
          onChange={({ option }) => {
            refreshData({
              reached: option?.value,
            });
          }}
        />
      </TopItensContainer>
      {goalsResult ? (
        <GoalsGrid goals={goalsResult} refreshData={refreshData} />
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Goals;
