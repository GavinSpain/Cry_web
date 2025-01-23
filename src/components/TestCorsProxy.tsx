import React, { useEffect, useState } from 'react';
import { logger } from '../utils/logger';

const API_URL = import.meta.env.VITE_API_URL;

interface HeartbeatResponse {
  heartbeats: Array<{
    service_id: number;
    seconds_since_last: number;
  }>;
}

export function TestCorsProxy() {
  const [heartbeatData, setHeartbeatData] = useState<HeartbeatResponse | null>(null);
  const [heartbeatError, setHeartbeatError] = useState<string>('');

  useEffect(() => {
    const fetchHeartbeat = async () => {
      try {
        const response = await fetch(`${API_URL}/api/heartbeat`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHeartbeatData(data);
        logger.info('Successfully fetched from heartbeat API', { data });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setHeartbeatError(message);
        logger.error('Failed to fetch from heartbeat API', { error: message });
      }
    };

    fetchHeartbeat();
  }, []);

  return (
    <div className="space-y-6">
      {/* Heartbeat API Test */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Heartbeat API Test</h2>
        {heartbeatError && (
          <div className="text-red-400 mb-4">
            Error: {heartbeatError}
          </div>
        )}
        {heartbeatData && (
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {JSON.stringify(heartbeatData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}