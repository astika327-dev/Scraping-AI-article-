const Navbar = () => {
  return (
    <nav style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }} className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">TechNews</h1>
        <div>
          <a href="/" className="p-2">Home</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
