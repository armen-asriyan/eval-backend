import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./EditModal.css";
import {
  RiAddBoxLine,
  RiCloseLine,
  RiDeleteBin6Line,
  RiSave3Line,
} from "react-icons/ri";

import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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

    try {
      const response = await axios[method](url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setSuccess(response.data.message);
      closeModal();

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete the skill
  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.delete(`${apiUrl}/api/skills/${skill._id}`, {
        withCredentials: true,
      });
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
        <h2>{skill ? "Modifier la" : "Ajouter une"} compétence</h2>

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
        </form>

        {skill && (
          <button
            type="button"
            onClick={handleDeleteSubmit}
            className="edit-modal__btn delete"
            disabled={loading}
          >
            <RiDeleteBin6Line /> Supprimer
          </button>
        )}

        {/* Error and success messages */}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        {/* Loading spinner */}
        <LoadingSpinner loading={loading} isOverlay={true} />
      </div>
    </div>
  );
};

export default EditModal;
