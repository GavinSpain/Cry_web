export const logger = {
  info: (message: string, data?: any) => {
    console.log(
      `%c[INFO] ${new Date().toISOString()}\n${message}`,
      'color: #3b82f6',
      data || ''
    );
  },
  error: (message: string, error?: any) => {
    console.error(
      `%c[ERROR] ${new Date().toISOString()}\n${message}`,
      'color: #ef4444',
      error || ''
    );
  },
  warn: (message: string, data?: any) => {
    console.warn(
      `%c[WARN] ${new Date().toISOString()}\n${message}`,
      'color: #f59e0b',
      data || ''
    );
  }
};