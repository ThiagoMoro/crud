export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center text-sm">
        Developed by <span className="font-semibold">Thiago Moro</span> © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
