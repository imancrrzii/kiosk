const SUCCESS_CODES = ["0000", "00"];

const DEFAULT_MESSAGES = {
  SERVER_ERROR: "Terjadi kesalahan pada server. Silahkan coba kembali.",
  UNKNOWN_ERROR: "Terjadi kesalahan yang tidak diketahui.",
};

const MESSAGE_MAP = {
  "0000": "Success",
};

const mappingMsgService = (responseCode, responseMessage) => {
  if (SUCCESS_CODES.includes(responseCode)) {
    return null;
  }

  let errorMessage = "";

  if (responseMessage) {
    errorMessage = responseCode ? `${responseMessage} (Error-${responseCode})` : responseMessage;
  } else if (MESSAGE_MAP[responseCode]) {
    errorMessage = MESSAGE_MAP[responseCode];
  } else {
    errorMessage = DEFAULT_MESSAGES.SERVER_ERROR;
  }
  return errorMessage;
};

export default mappingMsgService;
