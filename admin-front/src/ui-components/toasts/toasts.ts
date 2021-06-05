import toast from "react-hot-toast";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { RADIUS } from "../../ui-constants/sizes";
import { EMOJIS } from "../icons/emojis";

export const errorToast = (
  message: string = "Ops, aconteceu um erro. Tente novamente"
) =>
  toast(message, {
    icon: EMOJIS.sadWorried,
    position: "bottom-center",
    style: {
      borderRadius: RADIUS.card,
      background: COLORS.error,
      color: "white",
      boxShadow: SHADOWS.card,
    },
  });
