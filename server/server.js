
let allVideos = [];
let favorites = [];

const express = require('express')
    , socket = require('socket.io');

const app = express()
    , io = socket(app.listen(4001, () => console.log('Server listening on port 4001')));

app.use(express.json())


//**********Endpoints **************//
    app.get("/test", (req,res) => {
  res.status(200).send("hi")
})

app.get('/api/favorites', (req, res) => {
  res.status(200).send(favorites)
})

app.post('/api/videos', (req, res) => {
  allVideos = req.body.videos
  console.log('hit')
  res.status(200).send(allVideos)
})

app.post('/api/addIt', (req, res) => {
  let video = req.body.video
  favorites.push(video)
  res.status(200).send(favorites)
})



//**********Sockets **********//
io.on('connection', socket => {
  console.log('User Connected');
  socket.emit("welcome", {userID: socket.id})
  
  socket.on('message sent', function(data) {
    console.log(data)
    data.user = this.id
    io.emit('message dispatched', data);
  })
  
  //  EVERYONE BUT ME
  socket.on('message sent', function(data) {
      data.user = this.id
      console.log(data)
      socket.broadcast.emit('message dispatched', data);
    })
    
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })
});




