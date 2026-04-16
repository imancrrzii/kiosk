import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ErrorBox({ msg }) {
  return (
    <div className="bg-rose-200 border border-rose-500 text-rose-600 text-sm px-4 py-3 rounded-full mb-4 flex items-center gap-2">
      <FontAwesomeIcon icon={faTriangleExclamation} size="sm" />
      {msg}
    </div>
  );
}

