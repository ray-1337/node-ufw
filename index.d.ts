declare const nodeUfw: {
  name: string;

  version: string;

  disable: () => Promise<Boolean>;

  enable: () => Promise<Boolean>;

  reset: () => Promise<Boolean>;

  reload: () => Promise<Boolean>;

  status: (raw?: boolean) => Promise<string | Array<ParsedStatus>>;

  logging: (type: LoggingType) => Promise<Boolean>;

  allow: {
    port: (port: number, protocol?: "udp" | "tcp") => Promise<Boolean>;
    address: (address: string, port?: number, protocol?: "udp" | "tcp") => Promise<Boolean>;
  };

  deny: {
    port: (port: number, protocol?: "udp" | "tcp") => Promise<Boolean>;
    address: (address: string, port?: number, protocol?: "udp" | "tcp") => Promise<Boolean>;
  };
};

type LoggingType = 'off' | 'on' | 'low' | 'medium' | 'high' | 'full';

interface ParsedStatus {
  to: string;
  action: string;
  from: string;
}

export = nodeUfw;