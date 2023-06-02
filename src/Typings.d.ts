interface ParsedStatus {
  to: string;
  action: string;
  from: string;
}

type LoggingType = 'off' | 'on' | 'low' | 'medium' | 'high' | 'full';

type PortProtocol = "udp" | "tcp";

export declare const nodeUfw: {
  name: string;

  version: string;

  disable: () => Promise<Boolean>;

  enable: () => Promise<Boolean>;

  reset: () => Promise<Boolean>;

  reload: () => Promise<Boolean>;

  status: (raw?: boolean) => Promise<string | ParsedStatus[] | null>;

  logging: (type: LoggingType) => Promise<Boolean>;

  allow: {
    port: (port: number, protocol?: PortProtocol) => Promise<Boolean>;
    address: (address: string, port?: number, protocol?: PortProtocol) => Promise<Boolean>;
  };

  deny: {
    port: (port: number, protocol?: PortProtocol) => Promise<Boolean>;
    address: (address: string, port?: number, protocol?: PortProtocol) => Promise<Boolean>;
  };
};