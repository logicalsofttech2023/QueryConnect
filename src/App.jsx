import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import WhyChooseUs from "./Components/WhyChooseUs";
import Team from "./Components/Team";
import WhyChooseFluid from "./Components/WhyChooseFluid";
import BannerApps from "./Components/BannerApps";
import Login from "./Components/Login";
import Profile from "./Components/Dashbaord/Profile";
import PHeader from "./Components/Dashbaord/PHeader";
import Sidebar from "./Components/Dashbaord/Sidebar";
import MyQueries from "./Components/Dashbaord/MyQueries";
import NewQueries from "./Components/Dashbaord/NewQueries";
import Dashboard from "./Components/Dashbaord/Dashbaord";
import Messages from "./Components/Dashbaord/Messages";
import Notifications from "./Components/Dashbaord/Notifications";
import Support from "./Components/Dashbaord/Support";
import MyQueryDetail from "./Components/Dashbaord/MyQueryDetail";
import MyImageEditor from "./Components/Dashbaord/MyImageEditor";
import CallHistory from "./Components/Dashbaord/CallHistory";
import JitsiCall from "./Components/Dashbaord/JitsiCall";
import UserProfile from "./Components/Dashbaord/UserProfile";
import DynamicForm from "./Components/Dashbaord/DynamicForm";
import InactiveQueries from "./Components/Dashbaord/InactiveQueries";

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

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page with Layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Banner />
            </MainLayout>
          }
        />

        {/* Team Page with Layout */}
        <Route
          path="/team"
          element={
            <MainLayout>
              <Team />
            </MainLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProfileLayout>
              <Dashboard />
            </ProfileLayout>
          }
        />

        <Route
          path="/messages"
          element={
            <ProfileLayout>
              <Messages />
            </ProfileLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <ProfileLayout>
              <Profile />
            </ProfileLayout>
          }
        />

        <Route
          path="/myQueries"
          element={
            <ProfileLayout>
              <MyQueries />
            </ProfileLayout>
          }
        />

        <Route
          path="/newQueries"
          element={
            <ProfileLayout>
              <NewQueries />
            </ProfileLayout>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProfileLayout>
              <Notifications />
            </ProfileLayout>
          }
        />

        <Route
          path="/support"
          element={
            <ProfileLayout>
              <Support />
            </ProfileLayout>
          }
        />

        <Route
          path="/myQueryDetail"
          element={
            <ProfileLayout>
              <MyQueryDetail />
            </ProfileLayout>
          }
        />

        <Route
          path="/userProfile"
          element={
            <ProfileLayout>
              <UserProfile />
            </ProfileLayout>
          }
        />

        <Route
          path="/dynamicForm"
          element={
            <ProfileLayout>
              <DynamicForm />
            </ProfileLayout>
          }
        />

        <Route
          path="/inactiveQueries"
          element={
            <ProfileLayout>
              <InactiveQueries />
            </ProfileLayout>
          }
        />

        {/* Login Page without Header & Footer */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
