import React from "react";
import { IGoal } from "../../requests/financial-control/types";
import { Grid } from "../../ui-components/grid/grid.style";
import GoalCard from "./goal-card";
import EmptyState from "../../ui-components/empty-state/empty-state";

interface IGoalsGrid {
  goals: IGoal[] | null;
  refreshData: () => void;
}

const GoalsGrid: React.FC<IGoalsGrid> = ({ goals, refreshData }) => {
  return (
    <Grid>
      {goals && goals.length > 0 ? (
        goals.map((g) => (
          <GoalCard
            key={`card-${g.id}-${g.goalValue}`}
            goal={g}
            refreshData={refreshData}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </Grid>
  );
};

export default GoalsGrid;
