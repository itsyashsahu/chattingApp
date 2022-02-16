var express = require("express");
var app = express();
var cors = require("cors");
var expressServer = app.listen(9000);

var socketio = require("socket.io");
var namespaces = require("./data");
// console.log(namespaces);

var io = socketio(expressServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// io.on = io.of('/').on = io.sockets.on
// io.emit = io.of('/').emit = io.sockets.emit

io.on("connection", (socket) => {
  console.log("a User has Connected ");

  const users = [];
  // console.log( io.of("/linux").in("Debian").adapter.sids)
  //   console.log(socket.adapter.sids)

  // if(socket){
  for (let [id, socket] of io.of("/").adapter.sids) {
    users.push({
      userID: id,
      // username: socket.username,
    });
  }
  // }
  console.log(users);

  //   socket.broadcast.emit("users",users);
  io.emit("users", users);

  socket.on("sendPrivateMsg", (toUser,msg) => {
    console.log("server ",toUser,msg);
    socket.to(toUser).emit("recievePrivateMsg",msg)
  });

//   socket.on("newMsgToServer", (msg,) => {
//     console.log("ms ", msg);

//     // console.log(nsSocket.rooms["Debian"] )
//     // io.of(namespace.endpoint).to(roomToJoin).emit('messageToClients',"haan mein sun sakta hoon")
//   });

  // console.log(socket.handshake)
  // build an array to send back with the img and endpoing for each NS

  //   let nsData = namespaces.map((ns) => {
  //     return {
  //       img: ns.img,
  //       endpoint: ns.endpoint,
  //     };
  //   });
  //   // console.log(nsData)
  // sned the nsData back to the client. We need to use socket, NOT io, because we want it to
  // go to just this client.
  //   socket.emit("nsList", nsData);
});


if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

// loop through each namespace and listen for a connection

// namespaces.forEach((namespace) => {
//   console.log(namespace.endpoint);
//   // const thisNs = io.of(namespace.endpoint)
//   io.of(namespace.endpoint).on("connection", (nsSocket) => {
//     // console.log(nsSocket.handshake)
//     // const username = nsSocket.handshake.query.username;
//     console.log(
//       `someone ${nsSocket.id} joined the namespace ${namespace.endpoint} `
//     );

//     const users = [];
//     // console.log( io.of("/linux").in("Debian").adapter.sids)
//     for (let [id, socket] of io.of("/linux").in("Debian").adapter.sids) {
//       users.push({
//         userID: id,
//         username: socket.username,
//       });
//     }
//     console.log("user mile ",users)
//     // nsSocket.in("/linux").emit("users", users);
//     nsSocket.emit("users", users);
//     // console.log(`${nsSocket.id} has join ${namespace.endpoint}`)
//     // a socket has connected to one of our chatgroup namespaces.
//     // send that ns gorup info back

//     // nsSocket.emit("nsRoomLoad", namespace.rooms);
//     console.log("proivate messages ");

//     nsSocket.emit("privateMsg", "this is private messagee");

//     nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
//       // deal with history... once we have it
//       // const roomToLeave = Object.keys(nsSocket.rooms)[1];
//       // nsSocket.leave(roomToLeave);
//       // updateUsersInRoom(namespace, roomToLeave)
//       nsSocket.join(roomToJoin);

//       // console.log(".rooms  " ,nsSocket.rooms, roomToJoin);
//       let numClients;
//       io.of("/linux")
//         .in("Debian")
//         .fetchSockets()
//         .then((res) => {
//           // console.log("helllo ",res)
//           numClients = res.length;
//         });
//       numberOfUsersCallback(numClients);
//       nsSocket.emit("privateMsg", "this is private messagee");
//       // console.log("hello ",io.of('/linux').in("Debian").fetchSockets());

//       // io.of('/linux').in(roomToJoin).clients((error, clients)=>{
//       //     console.log("lenght of clients  ",clients.length)
//       //     numberOfUsersCallback(clients.length);
//       // })

//       // const nsRoom = namespace.rooms.find((room)=>{
//       //     return room.roomTitle === roomToJoin;
//       // })

//       // nsSocket.emit('historyCatchUp', nsRoom.history)

//       // updateUsersInRoom(namespace, roomToJoin);
//     });

//     nsSocket.on("newMsgToServer", (msg) => {
//       console.log("ms ", msg);

//       // console.log(nsSocket.rooms["Debian"] )
//       // io.of(namespace.endpoint).to(roomToJoin).emit('messageToClients',"haan mein sun sakta hoon")
//     });

//     // io.fetchSockets().then((res)=>{
//     //     console.log("toatal sockets  ",res)
//     // });
//     console.log(nsSocket.adapter.sids.size);
//     // console.log("sids of connected clients " ,nsSocket.adapter.sids)
//     nsSocket.on("private-message", (anotherSocketId, msg) => {
//       nsSocket.to(anotherSocketId).emit("private-message", nsSocket.id, msg);
//     });

//     nsSocket.on("newMessageToServer", (msg) => {
//       const fullMsg = {
//         text: msg.text,
//         time: Date.now(),
//         username: username,
//         avatar: "https://via.placeholder.com/30",
//       };
//       // console.log(fullMsg)
//       // Send this message to ALL the sockets that are in the room that THIS socket is in.
//       // how can we find out what rooms THIS socket is in?
//       // console.log(nsSocket.rooms)
//       // the user will be in the 2nd room in the object list
//       // this is because the socket ALWAYS joins its own room on connection
//       // get the keys
//       const roomTitle = Object.keys(nsSocket.rooms)[1];
//       // we need to find the Room object for this room
//       const nsRoom = namespace.rooms.find((room) => {
//         return room.roomTitle === roomTitle;
//       });
//       // console.log("The room object that we made that matches this NS room is...")
//       // console.log(nsRoom)
//       nsRoom.addMessage(fullMsg);
//     });
//       io.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg);

//   });
// });

// io.of("/linux")

// function updateUsersInRoom(namespace, roomToJoin){
//     // Send back the number of users in this room to ALL sockets connected to this room
//     io.of(namespace.endpoint).in(roomToJoin).clients((error,clients)=>{
//         // console.log(`There are ${clients.length} in this room`);
//         io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers',clients.length)
//     })
// }
