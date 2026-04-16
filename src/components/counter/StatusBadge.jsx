import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdjust, faWifi, faWifi3 } from "@fortawesome/free-solid-svg-icons";
import Badge from "../ui/Badge";

export function StatusBadge({ status }) {
  const map = {
    OFFLINE: ["neutral", "Offline", faWifi3],
    IDLE: ["success", "Siap", faWifi],
    BUSY: ["default", "Melayani", faAdjust],
  };

  const [color, label, icon] = map[status] || map.OFFLINE;

  return (
    <Badge
      color={color}
      label={label}
      leftIcon={icon}
      size="medium"
    />
  );
}