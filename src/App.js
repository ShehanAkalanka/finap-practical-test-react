import { BrowserRouter as Router, Link } from "react-router-dom";
import NavbarComponent from "./components/Header/NavbarComponent";
import Footer from "./components/Footer/Footer";
import StudentRegistration from "./components/StudentRegistration/StudentRegistration";
import AllRoutes from "./components/Router/AllRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <ToastContainer />
        <AllRoutes />
        <Footer />
      </Router>
    </>
  );
}

export default App;
