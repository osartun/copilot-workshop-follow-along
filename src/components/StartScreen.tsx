interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-cream">
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-serif text-accent mb-2">Soc Ops</h1>
        <p className="text-lg text-accent/70 mb-8">Social Bingo</p>
        
        <div className="bg-white/80 rounded-lg p-6 shadow-md border border-marked/30 mb-8">
          <h2 className="font-semibold text-accent mb-3">How to play</h2>
          <ul className="text-left text-accent/70 text-sm space-y-2">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-accent text-white font-semibold py-4 px-8 rounded-lg text-lg active:bg-accent-light transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
