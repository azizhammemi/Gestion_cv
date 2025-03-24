import { useNavigate } from 'react-router-dom';

export const Formeresumes = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/Resume');
  };

  return (
    <button
      onClick={handleNavigation}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Create Resume
    </button>
  );
};


