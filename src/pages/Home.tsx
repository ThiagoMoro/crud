import crudImg from "../assets/crud.svg";

export default function Home() {
  return (
    <div className="p-6 text-center flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-r from-blue-400 to-purple-600 text-white">
      <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome to My CRUD App</h2>
      <p className="text-lg mb-6 drop-shadow-md">
        Easily create, view, update, and delete your records.
      </p>
      <img
        src={crudImg}
        alt="CRUD illustration"
        className="mt-10 w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
  );
}
