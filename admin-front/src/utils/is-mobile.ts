import { WIDTHS } from "../ui-constants/sizes";

// eslint-disable-next-line no-restricted-globals
export const isMobile = () => screen.width <= parseInt(WIDTHS.mobileThreshold);
