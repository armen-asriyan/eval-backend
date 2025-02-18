import winston from "winston";

const logger = winston.createLogger({
  level: "info", // Niveau d'alerte par défaut
  format: winston.format.combine(
    // Colorer les logs
    winston.format.colorize(),
    // Combinaison des formats de logs
    winston.format.timestamp(), // Ajouter une date et heure pour chaque log
    winston.format.prettyPrint(),
    winston.format.printf(({ timestamp, level, message }) => {
      const localTime = new Date(timestamp).toLocaleString();
      return `${localTime} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Afficher les logs dans la console
    new winston.transports.File({ filename: "logs/all.log" }), // Enregistrer les logs dans un fichier
  ],
});

export default logger;
