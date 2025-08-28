import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ViewRecords from "./pages/ViewRecords";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-gradient-to-r from-blue-400 to-purple-600">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view" element={<ViewRecords />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
