import type { WSMessage } from "@/types/chat";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000/ws";
const RECONNECT_DELAY = 3000;
const MAX_RECONNECT_ATTEMPTS = 10;

type EventHandler = (data: any) => void;

export class WSClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private handlers = new Map<string, Set<EventHandler>>();
  private isIntentionallyClosed = false;
  private debug: boolean;

  constructor(url: string, debug = false) {
    this.url = url;
    this.debug = debug || process.env.NEXT_PUBLIC_DEBUG === "true";
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      this.isIntentionallyClosed = false;
      this.log("Connecting to WebSocket...");

      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          this.log("WebSocket connected");
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WSMessage = JSON.parse(event.data);
            this.log("Received:", message);
            this.handleMessage(message);
          } catch (error) {
            this.log("Failed to parse message:", error);
          }
        };

        this.ws.onerror = (error) => {
          this.log("WebSocket error:", error);
          reject(error);
        };

        this.ws.onclose = () => {
          this.log("WebSocket closed");
          this.ws = null;

          if (!this.isIntentionallyClosed) {
            this.scheduleReconnect();
          }
        };
      } catch (error) {
        this.log("Connection error:", error);
        reject(error);
      }
    });
  }

  disconnect() {
    this.log("Disconnecting...");
    this.isIntentionallyClosed = true;

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      this.log("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    this.log(
      `Scheduling reconnection attempt ${this.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`
    );

    this.reconnectTimeout = setTimeout(() => {
      this.connect().catch(() => {
        // Will retry again if fails
      });
    }, RECONNECT_DELAY);
  }

  send(type: string, payload: any) {
    if (this.ws?.readyState !== WebSocket.OPEN) {
      this.log("WebSocket not connected, queuing message");
      throw new Error("WebSocket not connected");
    }

    const message = { type, payload };
    this.log("Sending:", message);
    this.ws.send(JSON.stringify(message));
  }

  on(eventType: string, handler: EventHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
  }

  off(eventType: string, handler: EventHandler) {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  private handleMessage(message: WSMessage) {
    const handlers = this.handlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => handler(message.payload));
    }

    // Also emit to wildcard listeners
    const wildcardHandlers = this.handlers.get("*");
    if (wildcardHandlers) {
      wildcardHandlers.forEach((handler) => handler(message));
    }
  }

  private log(...args: any[]) {
    if (this.debug) {
      console.log("[WSClient]", ...args);
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Export singleton instance
export const wsClient = new WSClient(WS_URL);
