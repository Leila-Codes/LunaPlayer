import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import { env } from 'process'

class NowPlayingProgressEvent {
    title: string
    album: string
    artist: string
    progress: number

    constructor(title: string, album: string, artist: string, progress: number = 0) {
        this.title = title;
        this.album = album;
        this.artist = artist;
        this.progress = progress;
    }
}

class DeviceAddedEvent {
    label: string
    socket_id: string
}

export default function main() {
    const serverPort = parseInt(env.PORT || "8080"),
        server = createServer(),
        io = new Server();

    // Network Map:
    //  Public IP => Private IP => { label: <name>, socket: <id> }
    // const netMap: Map<String, Map<String, Socket>> = new Map();

    io.on('connection', socket => {
        // Create/join room for my Public IP address
        // This will allow us to detect all other devices currently running LunaPlayer.
        socket.join(socket.handshake.address);

        socket.on('joined', (devEvent: DeviceAddedEvent) => {
            socket.broadcast.to(socket.handshake.address).emit('joined', devEvent);
        });

        // On progress update from this socket.
        socket.on('progress', (progEvent: NowPlayingProgressEvent) => {
            socket.broadcast.to(socket.handshake.address).emit('progress', progEvent);
        })
    })
    
    io.listen(serverPort || 8080);
}

if (require.main === module)
    main()