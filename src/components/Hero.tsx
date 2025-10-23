const Hero = () => {
  return (
    <section className="text-center py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          <span className="block">Your Daily Dose of</span>
          <span className="block text-sky-400">Tech Innovation</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
          The latest news, breakthroughs, and insights from the world of technology, curated for you.
        </p>
      </div>
    </section>
  );
};

export default Hero;
