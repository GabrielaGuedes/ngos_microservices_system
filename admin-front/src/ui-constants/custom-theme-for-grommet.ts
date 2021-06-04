import { COLORS } from "./colors";

export const customThemeForGrommet = {
  global: {
    colors: {
      brand: COLORS.main,
      focus: COLORS.main,
    },
  },
  formField: {
    border: {
      error: {
        color: COLORS.error,
      },
    },
    label: {
      requiredIndicator: "*",
    },
    error: {
      color: COLORS.error,
    },
  },
};
