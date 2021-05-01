export interface IDevice {
  id?: string;
  name: string;
  port: number;
  isRunning: boolean;
  agentDb?: string;
}

