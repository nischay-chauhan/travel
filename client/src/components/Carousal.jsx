const Carousal = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(/background.avif)` }}>
      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-background/80"></div>
      {/* Text content with animation */}
      <div className="relative z-10 text-foreground text-4xl font-bold text-center animate-in fade-in-50 slide-in-from-bottom-5 duration-1000 ease-out">
        <h1 className="text-5xl md:text-7xl">Welcome Home! Anywhere you roam <br /> Stay with ease</h1>
      </div>
    </div>
  );
};

export default Carousal;
