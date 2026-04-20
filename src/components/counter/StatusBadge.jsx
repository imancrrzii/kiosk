import { faCircle, faWifi, faWifi3 } from "@fortawesome/free-solid-svg-icons";
import Badge from "../ui/Badge";

export function StatusBadge({ status }) {
  const statusConfig = {
    OFFLINE: {
      color: "neutral",
      label: "Offline",
      icon: faWifi3,
    },
    IDLE: {
      color: "info",
      label: "Siap",
      icon: faWifi,
    },
    BUSY: {
      color: "success",
      label: "Melayani",
      icon: faCircle,
    },
  };

  const config = statusConfig[status] || statusConfig.OFFLINE;

  return (
    <Badge
      color={config.color}
      label={config.label}
      leftIcon={config.icon}
      size="medium"
    />
  );
}