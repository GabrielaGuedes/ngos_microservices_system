import React from "react";
import { IEmployeeArea } from "../../../requests/employees/types";
import Button from "../../../ui-components/button/button";
import { AreaCardContainer, SeeMoreContainer } from "./area-card.style";
import BaseCard from "../../../ui-components/base-card/base-card";
import { useState } from "react";
import AreaDetailedInfoModal from "./area-detailed-info-modal";

interface IAreaCard {
  area: IEmployeeArea;
}

const AreaCard: React.FC<IAreaCard> = ({ area }) => {
  const [detailedModalOpen, setDetailedModalOpen] = useState(false);

  return (
    <AreaCardContainer>
      <BaseCard title={area.name}>
        {area.description}
        <SeeMoreContainer>
          <Button kind="text" onClick={() => setDetailedModalOpen(true)}>
            Ver mais
          </Button>
          <AreaDetailedInfoModal
            isOpen={detailedModalOpen}
            setIsOpen={setDetailedModalOpen}
            area={area}
          />
        </SeeMoreContainer>
      </BaseCard>
    </AreaCardContainer>
  );
};

export default AreaCard;
