import toast from "react-hot-toast";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { RADIUS } from "../../ui-constants/sizes";

export const errorToast = (
  message: string = "Ops, aconteceu um erro. Tente novamente"
) =>
  toast(message, {
    icon: "😥",
    position: "bottom-center",
    style: {
      borderRadius: RADIUS.card,
      background: COLORS.error,
      color: "white",
      boxShadow: SHADOWS.card,
    },
  });
