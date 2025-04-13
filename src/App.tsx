import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';

// Game components
import GameStart from './components/GameStart';
import GameScreen from './components/GameScreen';
import GameOver from './components/GameOver';
import DefeatScreen from './components/DefeatScreen';

// Game states
export type GameState = 'start' | 'playing' | 'victory' | 'defeat';
// Defeat reasons
export type DefeatReason = 'budget' | 'dataQuality' | 'reputation' | 'burnout' | 'dataBreach';

// Company context to be used throughout the game
export const companyContext = {
  name: "Nine Lives insurances.",
  industry: "Insurance",
  employees: 1000,
  revenue: "$1.2 billion",
  founded: 2005,
  headquarters: "San Francisco",
  dataTeamSize: 45,
  description: "A multinational insurance company providing insurance services to the furry world."
};

function App() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [defeatReason, setDefeatReason] = useState<DefeatReason>('budget');
  const [finalStats, setFinalStats] = useState({
    cdoBudget: 0,
    companyProfit: 0,
    dataQuality: 0,
    reputation: 0
  });
  
  // Start a new game
  const startGame = () => {
    setGameState('playing');
    setScore(1000000); // Starting with $1M CDO budget
  };
  
  // End the game with victory
  const endGameWithVictory = (stats: { cdoBudget: number; companyProfit: number; dataQuality: number; reputation: number }) => {
    setFinalStats(stats);
    setGameState('victory');
  };
  
  // End the game with defeat
  const endGameWithDefeat = (reason: DefeatReason, stats: { cdoBudget: number; companyProfit: number; dataQuality: number; reputation: number }) => {
    setDefeatReason(reason);
    setFinalStats(stats);
    setGameState('defeat');
  };
  
  // Restart the game
  const restartGame = () => {
    setGameState('start');
  };
  
  return (
    <AppContainer>
      {gameState === 'start' && <GameStart onStart={startGame} companyContext={companyContext} />}
      {gameState === 'playing' && (
        <GameScreen 
          initialScore={score} 
          initialMonth={1}
          onGameVictory={endGameWithVictory} 
          onGameDefeat={endGameWithDefeat}
          companyContext={companyContext}
        />
      )}
      {gameState === 'victory' && (
        <GameOver 
          stats={finalStats}
          onRestart={restartGame} 
          companyContext={companyContext}
        />
      )}
      {gameState === 'defeat' && (
        <DefeatScreen
          reason={defeatReason}
          stats={finalStats}
          onRestart={restartGame}
          companyContext={companyContext}
        />
      )}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f7;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export default App;
