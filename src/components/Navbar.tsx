import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-sky-400 transition-colors">
          TechNews
        </Link>
        <div>
          <Link href="/" className="text-gray-300 hover:text-sky-400 transition-colors">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
