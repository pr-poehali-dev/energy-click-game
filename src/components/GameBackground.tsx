
interface GameBackgroundProps {
  moveOffset: { x: number; y: number };
}

const GameBackground: React.FC<GameBackgroundProps> = ({ moveOffset }) => {
  return (
    <>
      {/* Неоновые линии */}
      <div className="absolute inset-0 z-0"
        style={{
          transform: `translate(${moveOffset.x * 0.1}px, ${moveOffset.y * 0.1}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-around opacity-10">
          {[...Array(15)].map((_, i) => (
            <div key={`h-line-${i}`} className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
          ))}
        </div>
        
        <div className="absolute inset-0 flex flex-row justify-around opacity-10">
          {[...Array(15)].map((_, i) => (
            <div key={`v-line-${i}`} className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameBackground;
