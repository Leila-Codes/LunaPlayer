const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getAlbums: () => ipcRenderer.invoke('album:list'),
    getAlbumDetail: (album_name: string) => ipcRenderer.invoke('album:get', album_name),
    getArtists: () => ipcRenderer.invoke('artist:list'),
    getArtistDetail: (artist_name: string) => ipcRenderer.invoke('artist:get', artist_name),
    getSongs: () => ipcRenderer.invoke('song:list'),
    getSongDetail: (songId: number) => ipcRenderer.invoke('song:get', songId)
})
