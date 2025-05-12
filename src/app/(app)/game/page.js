'use client';

import { useState } from 'react';
import axios from '@/lib/axios';

export default function GameButton({ jwtToken }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameResponse, setGameResponse] = useState(null);

  const startGame = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:3001/api/start', {
        game_data: 'example'
      }, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      
      setGameResponse(response.data);
      console.log('Svar från spelet:', response.data);
    } catch (error) {
      setError(error.response?.data || error.message);
      console.error('Fel vid anrop till spelet:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={startGame}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-blue-400"
      >
        {loading ? 'Startar...' : 'Starta spel'}
      </button>
      
      {error && (
        <p className="text-red-500 mt-2">Error: {error.toString()}</p>
      )}
      
      {gameResponse && (
        <div className="mt-4">
          <h3 className="font-bold">Spelets svar:</h3>
          <pre className="bg-gray-100 p-2 rounded mt-1">
            {JSON.stringify(gameResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}