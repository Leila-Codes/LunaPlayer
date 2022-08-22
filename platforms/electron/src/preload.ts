import {Album} from "../../../src/library";

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getAlbums: () => ipcRenderer.invoke('albumList'),
    getArtists: () => ipcRenderer.invoke('artistList'),
    getSongs: () => ipcRenderer.invoke('songList')
})
