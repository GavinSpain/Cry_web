export interface ServiceHeartbeat {
  service_id: number;
  seconds_since_last: number;
}

export interface ServiceHeartbeatsResponse {
  heartbeats: ServiceHeartbeat[];
}

export interface ServiceStatus {
  id: number;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  secondsSinceLastHeartbeat: number;
}

export const SERVICE_NAMES: Record<number, string> = {
  1: 'AWS Server',
  2: 'Solana Interface',
  3: 'Agents',
  4: 'Transactions',
  5: 'Database'
};