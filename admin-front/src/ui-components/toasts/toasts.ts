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

export const successToast = (message: string = "Salvo com succeso!") =>
  toast(message, {
    icon: EMOJIS.happy,
    position: "bottom-center",
    style: {
      borderRadius: RADIUS.card,
      background: COLORS.main,
      color: "white",
      boxShadow: SHADOWS.card,
    },
  });

export const loadingToast = (message: string = "Estamos salvando...") =>
  toast(message, {
    icon: EMOJIS.saving,
    position: "bottom-center",
    style: {
      borderRadius: RADIUS.card,
      background: COLORS.lightGray,
      color: "black",
      boxShadow: SHADOWS.card,
    },
  });
