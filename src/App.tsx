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
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserStorage>
          <Header />
          <main className="app-body">
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
