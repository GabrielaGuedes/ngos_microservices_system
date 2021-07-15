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
  tab: {
    active: {
      color: COLORS.main,
    },
    color: COLORS.text,
    border: {
      color: COLORS.text,
      active: {
        color: COLORS.main,
      },
      hover: {
        color: COLORS.mainHover,
      },
    },
    hover: {
      color: COLORS.mainHover,
    },
  },
  dataTable: {
    header: {
      color: "text-strong",
      extend: ({ column, sort, sortable }: any) => `
          ${
            sortable &&
            sort &&
            sort.property !== column &&
            `
              :hover {
                svg {
                  opacity: 100%;
                }
              }
            `
          }
         `,
    },
  },
};
