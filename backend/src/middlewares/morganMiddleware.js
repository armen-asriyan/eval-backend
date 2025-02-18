// Importer le module pour logger les requêtes HTTP
import morgan from "morgan";

// Importer winston pour enregistrer les logs
import logger from "../config/logger.js";

// Middleware morgan en utilisant winston pour enregistrer les logs

const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => {
      logger.info(message.trim()); // Logger la requête HTTP avec winston
    },
  },
});

export default morganMiddleware;
