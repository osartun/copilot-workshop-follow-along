interface StartScreenProps {
  onStart: (mode: 'bingo' | 'card-deck') => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-cream">
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-serif text-accent mb-2">Soc Ops</h1>
        <p className="text-lg text-accent/70 mb-8">Social Bingo</p>
        
        <div className="space-y-4">
          {/* Bingo Mode */}
          <div className="bg-white/80 rounded-lg p-6 shadow-md border border-marked/30">
            <h2 className="font-serif text-xl text-accent mb-2">Bingo Mode</h2>
            <p className="text-accent/70 text-sm mb-4">Find people who match the questions. Get 5 in a row to win!</p>
            <button
              onClick={() => onStart('bingo')}
              className="w-full bg-accent text-white font-semibold py-3 px-6 rounded-lg active:bg-accent-light transition-colors"
            >
              Start Bingo
            </button>
          </div>

          {/* Card Deck Mode */}
          <div className="bg-white/80 rounded-lg p-6 shadow-md border border-marked/30">
            <h2 className="font-serif text-xl text-accent mb-2">Card Deck</h2>
            <p className="text-accent/70 text-sm mb-4">Draw random question cards. Tap to shuffle through the deck.</p>
            <button
              onClick={() => onStart('card-deck')}
              className="w-full bg-accent-light text-white font-semibold py-3 px-6 rounded-lg active:bg-accent transition-colors"
            >
              Start Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
