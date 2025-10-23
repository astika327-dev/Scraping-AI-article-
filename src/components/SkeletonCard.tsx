const SkeletonCard = () => {
  return (
    <div className="rounded-lg overflow-hidden" style={{
      background: 'rgb(var(--tile-start-rgb))',
      borderColor: 'rgb(var(--tile-border))',
      borderWidth: '1px'
    }}>
      <div className="w-full h-48 bg-gray-700 animate-pulse"></div>
      <div className="p-5">
        <div className="w-3/4 h-6 bg-gray-700 animate-pulse mb-3 rounded"></div>
        <div className="w-full h-4 bg-gray-700 animate-pulse mb-2 rounded"></div>
        <div className="w-5/6 h-4 bg-gray-700 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
