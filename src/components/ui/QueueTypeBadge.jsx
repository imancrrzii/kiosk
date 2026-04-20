import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";
import Badge from "./Badge";

const QT_BADGE_COLOR = {
  ACCOUNT_REG: "success",
  PAYMENT: "sky",
  TOPUP: "amber",
  GENERAL: "slate",
};

export const QueueTypeBadge = ({ queueType }) => {
  if (!queueType) return null;

  const cfg = QUEUE_TYPE_CONFIG[queueType];
  if (!cfg) return null;

  return <Badge color={QT_BADGE_COLOR[queueType] || "slate"} label={cfg.label} leftIcon={cfg.icon} size="medium" />;
};
