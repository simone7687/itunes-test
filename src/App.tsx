import { getTopSongs } from 'BaseRestService';
import { Song } from 'model/Song';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [songs, setSongs] = useState<Song[]>([])
    const [artistName, setArtistName] = useState<string | undefined>()

    useEffect(() => {
        getTopSongs("Jake Kasdan").then((songs) => {
            setSongs(songs)
            if (songs.length > 0) {
                setArtistName(songs[0].artistName)
            }
        })
    }, [])


    return (
        <>
            <h2>{artistName}</h2>
        </>
    );
}

export default App;
