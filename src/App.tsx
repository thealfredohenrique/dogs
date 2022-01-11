import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./contexts/UserContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Post from "./components/Post";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/account/*"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/login/*" element={<Login />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;
