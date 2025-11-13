type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
}

const PII_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/g,
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
  /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
];

function redactPII(text: string): string {
  let redacted = text;
  PII_PATTERNS.forEach((pattern) => {
    redacted = redacted.replace(pattern, '[REDACTED]');
  });
  return redacted;
}

function sanitizeData(data: unknown): unknown {
  if (typeof data === 'string') {
    return redactPII(data);
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }
  if (data && typeof data === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeData(value);
    }
    return sanitized;
  }
  return data;
}

class Logger {
  private isDevelopment = __DEV__;

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (!this.isDevelopment && level === 'debug') {
      return;
    }

    const sanitizedMessage = redactPII(message);
    const sanitizedData = data ? sanitizeData(data) : undefined;

    const entry: LogEntry = {
      level,
      message: sanitizedMessage,
      timestamp: new Date(),
      data: sanitizedData,
    };

    switch (level) {
      case 'debug':
        console.log('[DEBUG]', entry.message, entry.data);
        break;
      case 'info':
        console.info('[INFO]', entry.message, entry.data);
        break;
      case 'warn':
        console.warn('[WARN]', entry.message, entry.data);
        break;
      case 'error':
        console.error('[ERROR]', entry.message, entry.data);
        break;
    }
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }
}

export const logger = new Logger();
