setTimeout(() => {
    // @ts-ignore
    window.electronAPI.getAlbums().then((albumList) => {
        console.log(albumList);
    });
}, 1500)
