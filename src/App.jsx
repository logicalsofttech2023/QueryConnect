import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Banner from "./Components/Banner";

import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Profile from "./Components/Dashbaord/Profile";
import PHeader from "./Components/Dashbaord/PHeader";
import Dashboard from "./Components/Dashbaord/Dashbaord";
import Messages from "./Components/Dashbaord/Messages";
import Notifications from "./Components/Dashbaord/Notifications";
import Support from "./Components/Dashbaord/Support";
import InactiveQueries from "./Components/Dashbaord/InactiveQueries";
import ChatAdmin from "./Components/ChatAdmin";
import NewQueries from "./Components/Dashbaord/NewQueries";
import { Navigate } from "react-router-dom";

// Layout for pages where Header & Footer are shown
function MainLayout({ children }) {
  return (
    <div
      id="wrapper"
      className="wrapper overflow-auto"
      style={{ height: "100vh", backgroundColor: "#615dfa" }}
    >
      <Header />
      {children}
    </div>
  );
}

function ProfileLayout({ children }) {
  return (
    <>
      <PHeader />
      {children}
    </>
  );
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              {localStorage.getItem("token") ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Banner />
              )}
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <Dashboard />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/newQueries"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <NewQueries />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <Messages />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <Profile />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <Notifications />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <Support />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <Chat />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatAdmin"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <ChatAdmin />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inactiveQueries"
          element={
            <ProtectedRoute>
              <ProfileLayout>
                <InactiveQueries />
              </ProfileLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
