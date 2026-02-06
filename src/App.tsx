import { useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { CardDeck } from './components/CardDeck';

function App() {
  const [gameMode, setGameMode] = useState<'bingo' | 'card-deck' | null>(null);

  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  const handleStartGame = (mode: 'bingo' | 'card-deck') => {
    setGameMode(mode);
    startGame();
  };

  const handleResetGame = () => {
    resetGame();
    setGameMode(null);
  };

  if (gameState === 'start') {
    return <StartScreen onStart={handleStartGame} />;
  }

  // For now, only render bingo mode
  if (gameMode === 'bingo') {
    return (
      <>
        <GameScreen
          board={board}
          winningSquareIds={winningSquareIds}
          hasBingo={gameState === 'win'}
          onSquareClick={handleSquareClick}
          onReset={handleResetGame}
        />
        {showBingoModal && (
          <BingoModal onDismiss={dismissModal} />
        )}
      </>
    );
  }

  if (gameMode === 'card-deck') {
    return <CardDeck onReset={handleResetGame} />;
  }

  return <StartScreen onStart={handleStartGame} />;
}

export default App;
