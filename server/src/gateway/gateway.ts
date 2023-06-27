import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      const { sessionId: roomId } = socket.handshake.query;
      socket.join(roomId);
    });
  }

  @SubscribeMessage('selectedSeat')
  onSelectedSeat(@MessageBody() body: any) {
    const { sessionId: roomId, row, seat } = body;
    this.server.to(roomId).emit('onSelectedSeat', {
      selectedSeat: { row, seat },
    });
  }
}
