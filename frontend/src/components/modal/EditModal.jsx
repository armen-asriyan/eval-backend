import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./EditModal.css";
import {
  RiAddBoxLine,
  RiAlertFill,
  RiCloseLine,
  RiDeleteBin6Line,
  RiSave3Line,
} from "react-icons/ri";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import authRefreshApi from "../../authRefreshApi";

const apiUrl = import.meta.env.VITE_API_URL;

const EditModal = ({ closeModal, skill, skillCategories, skillLevels }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: skill?.title || "",
    category: skill?.category || Object.keys(skillCategories)[0],
    level: skill?.level || Object.keys(skillLevels)[0],
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Check if user clicked the delete button
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle text input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const { files } = event.target;
    setFormData({ ...formData, image: files[0] });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("level", formData.level);
    if (formData.image) {
      data.append("image", formData.image);
    }

    const url = skill._id
      ? `${apiUrl}/api/skills/${skill._id}` // If there's a skill, edit it
      : `${apiUrl}/api/skills`; // Otherwise, add a new skill

    const method = skill?._id ? "put" : "post"; // Determine if it's a PUT (edit) or POST (add)

    // Call the corresponding API endpoint using the appropriate method
    try {
      // Use an instance of axios with an interceptor to handle 401 errors (refresh token)
      const response = await authRefreshApi[method](url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setSuccess(response.data?.message);
      closeModal();

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Function to show buttons to confirm or cancel the deletion
  const handleDeleteConfirm = (shownState) => {
    setIsDeleting(shownState);
  };

  // Function to delete the skill
  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await authRefreshApi.delete(
        `${apiUrl}/api/skills/${skill._id}`,
        {
          withCredentials: true,
        }
      );
      setSuccess(response.data.message);

      closeModal();

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-bg">
      <div className="edit-modal-content">
        <h2 className="edit-modal__title">
          {skill ? "Modifier la" : "Ajouter une"} compétence
        </h2>
        <form className="skill-form" onSubmit={handleSubmit}>
          <label htmlFor="skill-title">
            Nom de la compétence:
            <input
              type="text"
              id="skill-title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="category">
            Catégorie de la compétence:
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="skill-form__select"
              required
            >
              {Object.entries(skillCategories).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="level">
            Niveau de la compétence:
            <select
              name="level"
              id="level"
              value={formData.level}
              onChange={handleInputChange}
              className="skill-form__select"
              required
            >
              {Object.entries(skillLevels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="image">
            Image de la compétence:
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            className="edit-modal__btn save"
            disabled={loading}
          >
            {skill ? (
              <>
                <RiSave3Line /> Enregistrer
              </>
            ) : (
              <>
                <RiAddBoxLine /> Ajouter
              </>
            )}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="edit-modal__close-modal-btn"
            aria-label="Fermer la modale"
          >
            <RiCloseLine />
          </button>
          {/* If user hasn't yet clicked on the delete button */}
          {skill && (
            <button
              type="button"
              className="edit-modal__btn delete"
              onClick={() => handleDeleteConfirm(true)}
              disabled={loading}
            >
              <RiDeleteBin6Line /> Supprimer
            </button>
          )}

          {/* Error and success messages */}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>

        {isDeleting && (
          <div className="edit-modal-bg">
            <div className="edit-modal-content confirmation">
              <h2 className="edit-modal__title">
                Confirmation de la suppression
              </h2>
              <p className="edit-modal__confirm-delete-text">
                Êtes-vous sûr de vouloir supprimer cette compétence ?
                <RiAlertFill />
              </p>
              <div className="edit-modal__confirm-delete">
                <button
                  type="button"
                  className="edit-modal__btn delete"
                  onClick={handleDeleteSubmit}
                  disabled={loading}
                >
                  <RiDeleteBin6Line /> Supprimer
                </button>
                <button
                  type="button"
                  className="edit-modal__btn cancel-delete"
                  onClick={() => handleDeleteConfirm(false)}
                  disabled={loading}
                >
                  <RiCloseLine /> Annuler
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteConfirm(false)}
                  className="edit-modal__close-modal-btn"
                  aria-label="Fermer la modale"
                >
                  <RiCloseLine />
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Loading spinner */}
        <LoadingSpinner loading={loading} isOverlay={true} />
      </div>
    </div>
  );
};

export default EditModal;
