import React from "react";
import { Box, Spinner, Text } from "grommet";

interface ILoadingBox {
  pad?:
    | "none"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | string;
}

const LoadingBox: React.FC<ILoadingBox> = ({ pad }) => {
  return (
    <Box
      fill
      align="center"
      justify="center"
      direction="row"
      pad={pad}
      gap="small"
      background={{ color: "transparent", opacity: false }}
    >
      <Spinner />
      <Text weight="bold">Carregando...</Text>
    </Box>
  );
};

export default LoadingBox;
