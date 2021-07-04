import React from "react";
import { IGoal } from "../../requests/financial-control/types";
import { updateGoal } from "../../requests/financial-control/update-goal";
import { errorToast } from "../../ui-components/toasts/toasts";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import GridCard from "../../ui-components/grid-card/grid-card";
import MoreOptions from "../../ui-components/more-options/more-options";
import { EMOJIS } from "../../ui-components/icons/emojis";
import { IconsContainer, DeadlineContainer } from "./goals-card.style";
import DeleteGoalButton from "./delete-goal-button";
import EditGoalButton from "./edit-goal-button";

interface IGoalCard {
  goal: IGoal;
  refreshData: () => void;
}

const GoalCard: React.FC<IGoalCard> = ({ goal, refreshData }) => {
  const items = [
    {
      label: goal.reached ? "Marcar como pendente" : "Marcar como atingida",
      onClick: () => {
        const goalUpdated = { ...goal, reached: !goal.reached } as any;
        delete goalUpdated.id;
        delete goalUpdated.updatedAt;
        delete goalUpdated.createdAt;
        updateGoal(cleanEmptyEntries(goalUpdated) as any, goal.id)
          .then(() => refreshData())
          .catch(() => errorToast());
      },
    },
  ];

  const emoji = goal.reached ? EMOJIS.check : EMOJIS.pending;

  return (
    <GridCard
      title={`${emoji} R$ ${goal.currentValue.toFixed(
        2
      )} / R$ ${goal.goalValue.toFixed(2)}`}
      topRightElement={<MoreOptions items={items} />}
      size="large"
    >
      {goal.description}
      <DeadlineContainer>
        <b>Deadline: </b>
        {new Date(goal.deadline).toLocaleDateString()}
      </DeadlineContainer>
      <IconsContainer>
        <EditGoalButton goal={goal} refreshData={refreshData} />
        <DeleteGoalButton
          key={`delete-${goal.id}-${goal.goalValue}`}
          id={goal.id}
          value={goal.goalValue}
          refreshData={refreshData}
        />
      </IconsContainer>
    </GridCard>
  );
};

export default GoalCard;
