import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-2xl">My CRUD App</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/view" className="hover:underline">View Records</Link>
        </div>
      </div>
    </nav>
  );
}
