declare module 'http' {
  interface IncomingMessage {
    method?: string;
    url?: string;
    on(event: string, listener: (chunk: any) => void): void;
  }

  interface ServerResponse {
    setHeader(name: string, value: string): void;
    writeHead(status: number): void;
    end(data?: string): void;
  }

  function createServer(
    requestListener: (req: IncomingMessage, res: ServerResponse) => void
  ): { listen(port: number, callback?: () => void): void };
}
