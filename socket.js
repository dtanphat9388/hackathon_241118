const socket = io();
socket.once("connect", () => {
  socket.on('init', data => console.log(data))

  const socketInfoEl = document.querySelector('#info .socketid')
  socketInfoEl.textContent = socket.id;
  

  /* update list of socket */
  const socketIDsEl = document.querySelector('#info #socketList')
  socket.on('newConnect', sockets => {
    let  excludeCurrentSocket = sockets.filter(socketid => socketid !== socket.id)
    for (let socket of excludeCurrentSocket) {
      let option = document.createElement('option')
      option.id = socket
      option.textContent = socket;
      socketIDsEl.append(option)
    }
  })
  socket.on('updateList', socket => {
    const option = socketIDsEl.querySelector(`#${socket}`)
    socketIDsEl.removeChild(option)
  })

  
  /* realtime input */
  let textArea = document.querySelector('textarea');
  textArea.oninput = function(e) {
    socket.emit('typing', this.value)
  }

  socket.on('typing', value => {
    textArea.value = value
  })

})