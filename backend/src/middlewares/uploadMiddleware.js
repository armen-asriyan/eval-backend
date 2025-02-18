import multer from "multer";
import { fileTypeFromBuffer } from "file-type";

// Configurer bufferStorage
const storage = multer.memoryStorage();

// Filtrer les fichiers avant de les stocker dans le buffer
const fileFilter = (req, file, cb) => {
  // Les types possibles
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  // S'il n'y a pas de mimetype, ou si le mimetype n'est pas autorisé
  if (!file.mimetype || !allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        `Format de fichier non autorisé. Types autorisés: ${allowedTypes.join(
          ", "
        )}`
      )
    );
  }

  /**
   * cb(error, acceptFile)
   * - error : Passer un message d'erreur
   * - acceptFile : Passer 'true' si le fichier est valide, sinon 'false'
   */
  cb(null, true);
};

/**
 * @property {Object} storage : Configurer le type de stockage (buffer)
 * @property {Object} limits : Limiter la taille des fichiers
 * @property {Object} fileFilter : Configurer le filtre des fichiers
 * @returns Stocker le fichier dans le buffer
 */
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// Exporter multer
export default upload;
