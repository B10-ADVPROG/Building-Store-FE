import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#dc3545" }}>403 - Unauthorized</h1>
      <p style={{ fontSize: "1rem", color: "#6c757d", marginBottom: "2rem", textAlign: "center" }}>
        You don't have permission to access this page.<br />
      </p>
      <button
        onClick={handleBack}
        style={{
          padding: "0.5rem 1.5rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        Go to Homepage
      </button>
    </div>
  );
}
