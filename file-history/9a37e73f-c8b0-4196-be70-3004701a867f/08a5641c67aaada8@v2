/**
 * Dictionary Widget
 * Look up word definitions, synonyms, and pronunciations
 */

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';

interface WordDefinition {
  word: string;
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms?: string[];
    }[];
  }[];
}

export const DictionaryWidget: React.FC = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState<WordDefinition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupWord = async (searchWord: string) => {
    if (!searchWord.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord.toLowerCase()}`
      );
      if (!response.ok) throw new Error('Word not found');

      const data = await response.json();
      setDefinition(data[0]);
    } catch (err) {
      setError('Word not found. Try another.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupWord(word);
  };

  return (
    <BaseWidget title="Dictionary" icon="📖" loading={loading} error={error}>
      <div className="space-y-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word..."
            className="flex-1 px-3 py-2 text-sm rounded-button bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue transition-all duration-standard ease-smooth"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button text-sm font-medium transition-all duration-standard ease-smooth"
          >
            Search
          </button>
        </form>

        {definition && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <div>
              <h3 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary capitalize">
                {definition.word}
              </h3>
              {definition.phonetic && (
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  {definition.phonetic}
                </p>
              )}
            </div>

            {definition.meanings.slice(0, 2).map((meaning, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-sm font-semibold text-accent-blue capitalize">
                  {meaning.partOfSpeech}
                </h4>
                {meaning.definitions.slice(0, 2).map((def, defIdx) => (
                  <div key={defIdx} className="pl-3 border-l-2 border-border-light dark:border-border-dark">
                    <p className="text-sm text-text-light-primary dark:text-text-dark-primary">
                      {def.definition}
                    </p>
                    {def.example && (
                      <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary italic mt-1">
                        "{def.example}"
                      </p>
                    )}
                    {def.synonyms && def.synonyms.length > 0 && (
                      <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                        Synonyms: {def.synonyms.slice(0, 3).join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {!definition && !loading && !error && (
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary text-center py-4">
            Enter a word to see its definition
          </p>
        )}
      </div>
    </BaseWidget>
  );
};
