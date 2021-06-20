export const COLORS = {
  background: "#F4EAE6",
  text: "#2F5061",
  textActive: "#436170",
  error: "#A4031F",
  errorHover: "#ad1c35",
  errorActive: "#830218",
  errorTransparent: "rgba(164, 3, 31, 0.2)",
  errorActiveTransparent: "rgba(131, 2, 24, 0.2)",
  main: "#4297A0",
  mainHover: "#3b8790",
  mainActive: "#2e6970",
  mainTransparent: "rgba(66, 151, 160, 0.2)",
  mainActiveTransparent: "rgba(46, 105, 112, 0.2)",
  coral: "#E57F84",
  lightCoral: "#eca5a8",
  sienna: "#4A051C",
  lightGray: "#ededed",
  gray: "#d4d4d4",
};

export const BUTTONS_COLORS = (danger?: boolean): { [index: string]: any } => ({
  primary: {
    background: danger ? COLORS.error : COLORS.main,
    disabledBackground: COLORS.mainHover,
    font: "white",
    hover: danger ? COLORS.errorHover : COLORS.mainHover,
    active: danger ? COLORS.errorActive : COLORS.mainActive,
    border: danger ? COLORS.errorHover : COLORS.mainHover,
  },
  secondary: {
    background: "white",
    disabledBackground: COLORS.lightGray,
    font: danger ? COLORS.error : COLORS.main,
    hover: COLORS.lightGray,
    active: COLORS.gray,
    border: danger ? COLORS.error : COLORS.main,
  },
  text: {
    background: "transparent",
    disabledBackground: danger
      ? COLORS.errorTransparent
      : COLORS.mainTransparent,
    font: danger ? COLORS.error : COLORS.main,
    hover: danger ? COLORS.errorTransparent : COLORS.mainTransparent,
    active: danger
      ? COLORS.errorActiveTransparent
      : COLORS.mainActiveTransparent,
  },
});
