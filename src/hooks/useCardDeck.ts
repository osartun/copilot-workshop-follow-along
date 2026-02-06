import { useState, useCallback, useMemo } from 'react';
import { questions } from '../data/questions';

export interface CardDeckState {
  currentQuestion: string;
  cardsDrawn: number;
  hasStarted: boolean;
}

export interface CardDeckActions {
  drawCard: () => void;
  reset: () => void;
}

export function useCardDeck(): CardDeckState & CardDeckActions {
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [cardsDrawn, setCardsDrawn] = useState<number>(0);
  const [drawnIndices, setDrawnIndices] = useState<Set<number>>(new Set());

  const hasStarted = useMemo(() => cardsDrawn > 0, [cardsDrawn]);

  const drawCard = useCallback(() => {
    // Get available questions (not yet drawn)
    const available = Array.from({ length: questions.length }, (_, i) => i).filter(
      (i) => !drawnIndices.has(i)
    );

    // If all cards drawn, reset and draw again
    if (available.length === 0) {
      const firstIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[firstIndex]);
      setCardsDrawn(1);
      setDrawnIndices(new Set([firstIndex]));
      return;
    }

    // Draw random card from available
    const randomIndex = available[Math.floor(Math.random() * available.length)];
    setCurrentQuestion(questions[randomIndex]);
    setDrawnIndices((prev) => new Set([...prev, randomIndex]));
    setCardsDrawn((prev) => prev + 1);
  }, [drawnIndices]);

  const reset = useCallback(() => {
    setCurrentQuestion('');
    setCardsDrawn(0);
    setDrawnIndices(new Set());
  }, []);

  return {
    currentQuestion,
    cardsDrawn,
    hasStarted,
    drawCard,
    reset,
  };
}
