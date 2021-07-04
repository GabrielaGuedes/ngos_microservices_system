import { Tip, Box, Text, Button } from "grommet";
import React, { ReactNode } from "react";
import { CircleInformation } from "grommet-icons";
import { COLORS } from "../../ui-constants/colors";

interface ITooltip {
  title?: string;
  children: ReactNode;
}

const Tooltip: React.FC<ITooltip> = ({ title, children }) => {
  return (
    <Tip
      content={
        <Box
          pad="small"
          width={{ max: "small" }}
          background={COLORS.background}
        >
          {title && <Text weight="bold">{title}</Text>}
          <Text>{children}</Text>
        </Box>
      }
    >
      <Button icon={<CircleInformation size="medium" />} />
    </Tip>
  );
};

export default Tooltip;
