/* Simple video chat app. Developed by : Ragul.H */

let custom_code = Math.floor(1000 + Math.random() * 9000).toString()

const peer = new Peer(custom_code, {
    host: 'localhost',
    port: 3001,
    path: '/myapp'
})
let connect = document.getElementById('connect')
let share = document.getElementById('share')
let self_screen = document.getElementById('self')
let peer_screen = document.getElementById('peer')
let conn, code, call

peer.on('open', (id) => {
	document.getElementById('peer-id').innerHTML = 'Your Id : ' + id
})

peer.on('connection', (conn) => {
    conn.on('data', (data) => {
      console.log(data)
    })
})

connect.addEventListener('click', () => {
    code = document.getElementById('code').value

    conn = peer.connect(code)
    conn.on('open', function(){
        conn.send('Connected with peer !')
    })
})

share.addEventListener('click', () => {
    navigator.mediaDevices.getDisplayMedia({video: true, audio: false})
    .then((stream) => {
        self_screen.srcObject = stream
        self_screen.play()

        call = peer.call(code, stream)

        call.on('stream', (remoteStream) => {
            peer_screen.srcObject = remoteStream
            peer_screen.play()
        })
    })
    .catch(e => console.log(e))
})

peer.on('call', (the_call) => {
    navigator.mediaDevices.getDisplayMedia({video: true, audio: false})
    .then((stream) => {
        self_screen.srcObject = stream
        self_screen.play()

        the_call.answer(stream)
        the_call.on('stream', (remoteStream) => {
            peer_screen.srcObject = remoteStream
            peer_screen.play()
        })
    })
})