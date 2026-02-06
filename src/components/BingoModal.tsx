interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-accent/20 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-cream rounded-xl p-6 max-w-xs w-full text-center shadow-2xl border border-accent/20 animate-[scaleIn_0.4s_ease-out]">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-serif text-accent mb-2">BINGO!</h2>
        <p className="text-accent/70 mb-6">You completed a line!</p>
        
        <button
          onClick={onDismiss}
          className="w-full bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-accent-light active:bg-accent-light transition-colors"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
