import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: "#0b2545" }} // Navy dark blue background
    >
      <div
        className="card shadow p-4 text-center"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#13294b", // sedikit lebih terang dari background utama
          border: "none",
          borderRadius: "12px",
        }}
      >
        <div className="card-body">
          <h1
            className="fw-bold mb-3"
            style={{ color: "#f2f4f8", fontSize: "3rem" }}
          >
            403 - Unauthorized
          </h1>
          <p className="mb-4" style={{ color: "#d1d5db" }}>
            You don't have permission to access this page.
          </p>
          <button
            className="btn"
            onClick={handleBack}
            style={{
              backgroundColor: "#1e3a8a", // navy blue button
              color: "#f2f4f8",
              padding: "0.6rem 2rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3b82f6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1e3a8a")
            }
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
