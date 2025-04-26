import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./page/login/LoginPage";
import TaskManagement from "./page/taskManagement/TaskManagement";
import ProtectedRoute from "./page/protectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskForm from "./page/taskManagement/TaskForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <TaskManagement onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
         <Route
          path="/create"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <TaskForm onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
         <Route
          path="/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} onLogout={handleLogout}>
              <TaskForm onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
