import React from "react";
import DonationsForm from "./donations-form";
import { DonationsStyled, Subtitle } from "./donations.style";

interface IDonations {}

const Donations: React.FC<IDonations> = () => {
  return (
    <DonationsStyled>
      <Subtitle>Sua doação fará toda a diferença. :)</Subtitle>
      <DonationsForm />
    </DonationsStyled>
  );
};

export default Donations;
