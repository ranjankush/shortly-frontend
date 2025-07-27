import { Toaster } from "react-hot-toast";
import AboutPage from "./component/AboutPage";
import Footer from "./component/Footer";
import LandingPage from "./component/LandingPage";
import LoginPage from "./component/LoginPage";
import NavBar from "./component/NavBar";
import RegisterPage from "./component/RegisterPage";
import DashboardLayout from "./dashboard/DashboardLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShortenUrlPage from "./component/ShortenUrlPage";
import PrivateRoute from "./PrivateRouter";

const AppRouter = () => {
  return (
    <>
        <NavBar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage/></PrivateRoute>} />
          <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage/></PrivateRoute>} /> */}

           <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout/></PrivateRoute>} />
          <Route path="/s/:url" element={<ShortenUrlPage />} />
        </Routes>

        <Footer />
    </>
  );
};
export default AppRouter;

export const SubDomainRouter=()=>{
    return(
        <Routes>
          <Route path="/:url" element={<ShortenUrlPage/>} />
        </Routes>
    );
}
