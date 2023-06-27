import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
  onSelectedSeat(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    const { sessionId: roomId, row, seat } = body;
    socket.broadcast.to(roomId).emit('onSelectedSeat', {
      selectedSeat: { row, seat },
    });
  }
}
