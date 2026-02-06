import { useCardDeck } from '../hooks/useCardDeck';
import { useState, useEffect } from 'react';

interface CardDeckProps {
  onReset: () => void;
}

export function CardDeck({ onReset }: CardDeckProps) {
  const { currentQuestion, cardsDrawn, hasStarted, drawCard } = useCardDeck();
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastAction, setLastAction] = useState<'left' | 'right' | 'center' | null>(null);

  // Trigger animation on card change
  useEffect(() => {
    if (hasStarted && currentQuestion) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, hasStarted]);

  const handleCardTap = () => {
    setLastAction('center');
    drawCard();
  };

  const handleLeftTap = () => {
    setLastAction('left');
    drawCard();
  };

  const handleRightTap = () => {
    setLastAction('right');
    drawCard();
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <div className="flex flex-col min-h-full bg-cream">
      {/* Header */}
      <header className="flex items-center justify-between p-3 bg-white/50 border-b border-marked/20">
        <button
          onClick={handleReset}
          className="text-accent/60 text-sm px-3 py-1.5 rounded transition-colors hover:text-accent"
        >
          ← Back
        </button>
        <h1 className="font-serif font-bold text-accent">Card Deck</h1>
        <div className="w-16 text-right">
          {cardsDrawn > 0 && (
            <div className="flex items-center justify-end gap-2">
              <span className="text-xl font-bold text-accent">{cardsDrawn}</span>
              <span className="text-xs text-accent/50">drawn</span>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {!hasStarted ? (
          <div className="text-center max-w-md">
            <h2 className="font-serif text-4xl text-accent mb-3">Ready?</h2>
            <p className="text-accent/70 mb-10">Tap any card to start drawing questions. Find matches and build connections!</p>
            <div
              onClick={handleCardTap}
              className="w-full h-80 bg-white rounded-2xl shadow-lg border-2 border-marked/30 flex items-center justify-center cursor-pointer hover:shadow-2xl hover:border-accent/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="text-center">
                <p className="text-3xl mb-2">🎴</p>
                <p className="text-accent/70 text-lg font-serif">Tap to begin</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            <div className="relative h-96 flex items-center justify-center mx-auto">
              {/* Left response zone */}
              <div
                onClick={handleLeftTap}
                className={`absolute left-0 top-0 bottom-0 w-20 cursor-pointer group flex items-center justify-center transition-all ${
                  lastAction === 'left' ? 'bg-red-100/30 rounded-l-2xl' : 'hover:bg-red-50/30'
                }`}
              >
                <div className={`text-center transition-all duration-300 ${
                  lastAction === 'left' ? 'scale-125 text-red-400' : 'text-accent/30 group-hover:text-accent/60'
                }`}>
                  <p className="text-2xl font-semibold">✕</p>
                  <p className="text-xs mt-1">Skip</p>
                </div>
              </div>

              {/* Center card */}
              <div
                onClick={handleCardTap}
                className={`relative w-full max-w-sm bg-white rounded-2xl shadow-xl border-2 border-marked/30 p-8 cursor-pointer transition-all duration-300 transform ${
                  isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                } hover:shadow-2xl hover:border-accent/50 active:scale-95`}
              >
                <p className="text-center text-xl sm:text-2xl font-serif text-accent leading-relaxed min-h-48 flex items-center justify-center">
                  {currentQuestion}
                </p>
              </div>

              {/* Right response zone */}
              <div
                onClick={handleRightTap}
                className={`absolute right-0 top-0 bottom-0 w-20 cursor-pointer group flex items-center justify-center transition-all ${
                  lastAction === 'right' ? 'bg-green-100/30 rounded-r-2xl' : 'hover:bg-green-50/30'
                }`}
              >
                <div className={`text-center transition-all duration-300 ${
                  lastAction === 'right' ? 'scale-125 text-green-600' : 'text-marked group-hover:text-marked-border'
                }`}>
                  <p className="text-2xl font-semibold">✓</p>
                  <p className="text-xs mt-1">Match</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 space-y-3">
              <p className="text-sm text-accent/70">
                <span className="font-semibold text-accent">Left</span> to skip • 
                <span className="font-semibold text-accent ml-1">Tap card</span> for next • 
                <span className="font-semibold text-accent ml-1">Right</span> for match
              </p>
              <div className="inline-block bg-white/50 rounded-lg px-4 py-2 border border-marked/20">
                <p className="text-lg font-bold text-accent">{cardsDrawn}</p>
                <p className="text-xs text-accent/60">cards drawn</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
