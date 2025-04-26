import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children, onLogout }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {children}
      <Button className="mt-2" variant="danger" onClick={() => onLogout()}>
        Logout
      </Button>
    </>
  );
};

export default ProtectedRoute;
