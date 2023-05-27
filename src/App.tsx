import { Box, CircularProgress, Grid } from '@mui/material';
import { getTopSongs } from 'BaseRestService';
import Navbar from 'components/Navbar';
import SongCard from 'components/SongCard';
import { Song } from 'model/Song';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [songs, setSongs] = useState<Song[]>([])
    const [artistName, setArtistName] = useState<string | undefined>()
    const [searchValue, setSearchValue] = useState<string>("Jake Kasdan")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        getTopSongs(searchValue).then((songs) => {
            setSongs(songs)
            if (songs.length > 0) {
                setArtistName(songs[0].artistName)
            }
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }, [searchValue])


    return (
        <>
            <Navbar
                serch={setSearchValue}
                loading={loading}
            />
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={4}
                pt={4}
                marginBottom={4}
            >
                {!loading && <>
                    {songs.length > 0 &&
                        <>
                            <h2>{artistName}</h2>
                            {songs.map((song) => {
                                return <SongCard song={song} />
                            })}
                        </>
                    }
                    {songs.length === 0 && <h2>Nessuna artista trovato</h2>}
                </>}
                {loading && <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>}
            </Grid>
        </>
    );
}

export default App;
