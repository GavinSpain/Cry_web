import { useQuery } from '@tanstack/react-query';
import { ServiceHeartbeat, ServiceHeartbeatsResponse, SERVICE_NAMES } from '../types/serviceHealth';
import { logger } from '../utils/logger';

const API_URL = import.meta.env.VITE_API_URL;

const fetchServiceHeartbeats = async (): Promise<ServiceHeartbeatsResponse> => {
  const startTime = performance.now();
  
  try {
    const response = await fetch(`${API_URL}/api/heartbeatstatus`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const endTime = performance.now();
    const responseTime = Math.round(endTime - startTime);
    
    logger.info(`Heartbeat API Response`, {
      responseTime: `${responseTime}ms`,
      status: response.status,
      statusText: response.statusText,
      timestamp: new Date().toISOString()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    logger.info('Heartbeat Data Received', { data });
    return data;
  } catch (error) {
    logger.error('Heartbeat API Request Failed', { error });
    return { heartbeats: [] };
  }
};

export const useServiceHealth = () => {
  return useQuery({
    queryKey: ['serviceHealth'],
    queryFn: fetchServiceHeartbeats,
    refetchInterval: 30000,
    retry: 2,
    select: (data: ServiceHeartbeatsResponse) => {
      const heartbeats = data.heartbeats ?? [];
      const heartbeatsMap = new Map<number, number>(
        heartbeats.map(hb => [hb.service_id, hb.seconds_since_last])
      );

      return Object.entries(SERVICE_NAMES).map(([id, name]) => {
        const serviceId = parseInt(id);
        const secondsSinceLastHeartbeat = heartbeatsMap.get(serviceId) ?? -1;
        const status = secondsSinceLastHeartbeat === -1 ? 'down' :
                      secondsSinceLastHeartbeat > 20 ? 'degraded' : 'healthy';

        return {
          id: serviceId,
          name,
          status,
          secondsSinceLastHeartbeat
        };
      });
    }
  });
};