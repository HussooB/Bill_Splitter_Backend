import { Server } from "socket.io";

export default (io: Server) => {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("joinRoom", (roomId: string, ack?: () => void) => {
      socket.join(roomId);
      console.log(`➡️ Socket ${socket.id} joined room ${roomId}`);
      if (ack) ack();
      socket.emit("joinedRoom", roomId);
    });

    socket.on("sendMessage", (data) => {
      const messageText = data.text || data.message || "";
      console.log(`💬 Message from ${socket.id} to room ${data.roomId}:`, messageText);

      const messagePayload = {
        id: data.id || crypto.randomUUID(),
        senderName: data.senderName || "Unknown",
        text: messageText,
        createdAt: data.createdAt || new Date().toISOString(),
      };

      io.to(data.roomId).emit("newMessage", messagePayload);
    });

    socket.on("sendProof", (data) => {
      console.log(`📎 Proof from ${socket.id} to room ${data.roomId}:`, data);

      const proofPayload = {
        id: data.id || crypto.randomUUID(),
        senderName: data.senderName || "Unknown",
        proofUrl: data.fileUrl,
        createdAt: data.createdAt || new Date().toISOString(),
      };

      io.to(data.roomId).emit("newProof", proofPayload);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};
