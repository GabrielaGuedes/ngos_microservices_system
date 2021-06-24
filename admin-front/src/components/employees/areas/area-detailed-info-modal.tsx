import React from "react";
import { IEmployeeArea } from "../../../requests/employees/types";
import Modal from "../../../ui-components/modal/modal";
import {
  EmployeeRow,
  Subtitle,
  DescriptionContainer,
} from "./area-detailed-info-modal.style";
import ShyEmptyState from "../../../ui-components/shy-empty-state/shy-empty-state";

interface IAreaDetailedInfoModal {
  area: IEmployeeArea;
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
      <Subtitle>Funcionários</Subtitle>
      {area.employees.length > 0 ? (
        area.employees.map((e) => (
          <EmployeeRow>
            <div>{e.name}</div>
            <div>{e.occupation}</div>
          </EmployeeRow>
        ))
      ) : (
        <ShyEmptyState />
      )}
    </Modal>
  );
};

export default AreaDetailedInfoModal;
