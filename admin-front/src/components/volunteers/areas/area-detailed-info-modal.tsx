import React from "react";
import { IVolunteerArea } from "../../../requests/volunteers/types";
import Modal from "../../../ui-components/modal/modal";
import {
  VolunteerRow,
  Subtitle,
  DescriptionContainer,
  VolunteerCol,
} from "./area-detailed-info-modal.style";
import ShyEmptyState from "../../../ui-components/shy-empty-state/shy-empty-state";

interface IAreaDetailedInfoModal {
  area: IVolunteerArea;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const AreaDetailedInfoModal: React.FC<IAreaDetailedInfoModal> = ({
  area,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={area.name}>
      <DescriptionContainer>
        <Subtitle>Descrição</Subtitle>
        {area.description || <ShyEmptyState />}
      </DescriptionContainer>
      <Subtitle>Voluntários</Subtitle>
      {area.volunteers.length > 0 ? (
        area.volunteers.map((v) => (
          <VolunteerRow key={`volunteer-row-${v.id}`}>
            <VolunteerCol>{v.name}</VolunteerCol>
            <VolunteerCol>{v.phone}</VolunteerCol>
          </VolunteerRow>
        ))
      ) : (
        <ShyEmptyState />
      )}
    </Modal>
  );
};

export default AreaDetailedInfoModal;
