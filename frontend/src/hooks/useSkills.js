import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const useSkills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [skillCategories, setSkillCategories] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.get(`${apiUrl}/api/skills`);
      setSkillsData(res.data.skills);
      setSkillCategories(res.data.categories);
      setSkillLevels(res.data.levels);
    } catch (error) {
      setError(error.message || "Error fetching skills data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skillsData,
    skillCategories,
    skillLevels,
    isLoading,
    error,
    refetchSkills: fetchSkills,
  };
};

export default useSkills;
