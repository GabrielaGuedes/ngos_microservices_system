import React from "react";
import { IEmployeeArea } from "../../../requests/employees/types";
import Button from "../../../ui-components/button/button";
import {
  AreaCardContainer,
  IconsContainer,
  BottomButtonsContainer,
} from "./area-card.style";
import BaseCard from "../../../ui-components/base-card/base-card";
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
    <AreaCardContainer>
      <BaseCard title={area.name}>
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
      </BaseCard>
    </AreaCardContainer>
  );
};

export default AreaCard;
