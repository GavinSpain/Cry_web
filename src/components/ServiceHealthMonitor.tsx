import React from 'react';
import { Activity, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { useServiceHealth } from '../hooks/useServiceHealth';
import type { ServiceStatus } from '../types/serviceHealth';
import { useQueryClient } from '@tanstack/react-query';

function ServiceHealthMonitor() {
  const { data: services, isLoading, isError, error } = useServiceHealth();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['serviceHealth'] });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Service Health</h3>
          <Activity size={24} className="text-blue-500 animate-spin" />
        </div>
        <div className="space-y-2">
          <p className="text-gray-400">Loading service status...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'degraded':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'down':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <AlertTriangle size={16} className="text-gray-500" />;
    }
  };

  const getStatusText = (seconds: number) => {
    if (seconds === -1) return 'Offline';
    if (seconds === 0) return 'Just now';
    return `${seconds}s ago`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Service Health</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            title="Refresh status"
          >
            <RefreshCw size={20} className="text-blue-500" />
          </button>
          <Activity size={24} className="text-blue-500" />
        </div>
      </div>
      <div className="space-y-2">
        {isError ? (
          <div className="text-red-400 text-sm p-2 rounded bg-red-900/20 mb-4">
            Unable to connect to monitoring service. Please try again.
          </div>
        ) : null}
        {services?.map(service => (
          <div key={service.id} className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{service.name}</span>
            <div className="flex items-center space-x-2">
              <span className={`text-xs ${
                service.status === 'healthy' ? 'text-green-400' :
                service.status === 'degraded' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {getStatusText(service.secondsSinceLastHeartbeat)}
              </span>
              {getStatusIcon(service.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceHealthMonitor;