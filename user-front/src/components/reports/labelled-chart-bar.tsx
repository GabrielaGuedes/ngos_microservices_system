import { Box, Chart, Text } from "grommet";
import React from "react";
import { COLORS } from "../../ui-constants/colors";

interface ILabelledChartBar {
  label: string;
  value: number;
}

const LabelledChartBar: React.FC<ILabelledChartBar> = ({ label, value }) => {
  return (
    <Box flex={false} basis="xsmall" align="center" gap="small">
      <Chart
        bounds={[
          [0, 2],
          [0, 400],
        ]}
        type="bar"
        values={[{ value: [1, value] }]}
        color={COLORS.main}
        round
        size={{ height: "medium", width: "xsmall" }}
      />
      <Box align="center" style={{ textAlign: "center" }}>
        <Text>{label}</Text>
        <Text weight="bold">R$ {value.toFixed(2)}</Text>
      </Box>
    </Box>
  );
};

export default LabelledChartBar;
