import React from "react";
import { IEmployeeArea } from "../../../requests/employees/types";
import Button from "../../../ui-components/button/button";
import { IconsContainer, BottomButtonsContainer } from "./area-card.style";
import GridCard from "../../../ui-components/grid-card/grid-card";
import { useState } from "react";
import AreaDetailedInfoModal from "./area-detailed-info-modal";
import EditAreaButton from "./edit-area-button";
import DeleteAreaButton from "./delete-area-button";

interface IAreaCard {
  area: IEmployeeArea;
  refreshData: () => void;
}

const AreaCard: React.FC<IAreaCard> = ({ area, refreshData }) => {
  const [detailedModalOpen, setDetailedModalOpen] = useState(false);

  return (
    <GridCard title={area.name}>
      {area.description}
      <BottomButtonsContainer>
        <IconsContainer>
          <EditAreaButton area={area} refreshData={refreshData} />
          <DeleteAreaButton
            key={`delete-${area.id}-${area.name}`}
            id={area.id}
            name={area.name}
            refreshData={refreshData}
          />
        </IconsContainer>
        <div>
          <Button kind="text" onClick={() => setDetailedModalOpen(true)}>
            Ver mais
          </Button>
          <AreaDetailedInfoModal
            key={`info-${area.id}-${area.name}`}
            isOpen={detailedModalOpen}
            setIsOpen={setDetailedModalOpen}
            area={area}
          />
        </div>
      </BottomButtonsContainer>
    </GridCard>
  );
};

export default AreaCard;
