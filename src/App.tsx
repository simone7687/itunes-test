import { Grid } from '@mui/material';
import { getTopSongs } from 'BaseRestService';
import SongCard from 'components/SongCard';
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
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={4}
            pt={4}
            marginBottom={4}
        >
            <h2>{artistName}</h2>
            {songs.map((song) => {
                return <SongCard song={song} />
            })}
        </Grid>
    );
}

export default App;
