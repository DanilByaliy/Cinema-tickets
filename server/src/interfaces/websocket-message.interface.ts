export interface WebsocketMessage {
  sessionId: string;
  seat: {
    row: number;
    seat: number;
  };
  isOccupied: boolean;
}
