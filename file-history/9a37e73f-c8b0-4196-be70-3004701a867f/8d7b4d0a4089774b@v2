/**
 * Memory Game Widget
 * Classic memory matching card game
 */

import React, { useState, useEffect } from 'react';
import { BaseWidget } from './BaseWidget';

const EMOJIS = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎬', '🎸', '🎹'];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export const MemoryGameWidget: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const initGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({
        id: idx,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, matched: true } : card
          ));
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, flipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setWon(true);
    }
  }, [cards]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].matched || cards[id].flipped) return;

    setCards(prev => prev.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    ));
    setFlippedCards(prev => [...prev, id]);
  };

  return (
    <BaseWidget title="Memory Game" icon="🧠">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
            Moves: {moves}
          </span>
          <button
            onClick={initGame}
            className="px-3 py-1 text-xs bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button transition-all duration-standard ease-smooth"
          >
            New Game
          </button>
        </div>

        {won && (
          <div className="bg-status-success/10 border border-status-success rounded-button p-2 text-center transition-all duration-standard ease-smooth">
            <div className="text-status-success font-semibold">You won!</div>
            <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
              {moves} moves
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-button text-2xl flex items-center justify-center transition-all duration-standard ease-smooth ${
                card.flipped || card.matched
                  ? 'bg-accent-blue text-white'
                  : 'bg-surface-light-elevated dark:bg-surface-dark hover:bg-surface-light dark:hover:bg-surface-dark-elevated'
              }`}
              disabled={card.matched}
            >
              {card.flipped || card.matched ? card.emoji : '?'}
            </button>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
};
