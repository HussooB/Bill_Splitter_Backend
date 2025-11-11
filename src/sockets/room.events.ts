import { Server } from "socket.io";

export default (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
      socket.emit("joinedRoom", roomId); // optional, frontend can wait for this
    });

    socket.on("sendMessage", (data) => {
      console.log(`Message from ${socket.id} to room ${data.roomId}:`, data.message);
      io.to(data.roomId).emit("newMessage", data);
    });

    socket.on("sendProof", (data) => {
      console.log(`Proof from ${socket.id} to room ${data.roomId}:`, data);
      io.to(data.roomId).emit("newProof", data);
    });

    socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
  });
};
