import { Box, CircularProgress, Grid } from '@mui/material';
import { getTopSongs } from 'BaseRestService';
import Navbar from 'components/Navbar';
import SongCard from 'components/SongCard';
import { Song } from 'model/Song';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [songs, setSongs] = useState<Song[]>([])
    const [artistName, setArtistName] = useState<string | undefined>("Jake Owen")
    const [searchValue, setSearchValue] = useState<string | undefined>("128412737")
    const [loading, setLoading] = useState<boolean>(false)

    const search = (id: string | undefined, name: string) => {
        if (id) {
            setSearchValue(id)
        }
        setArtistName(name)
    }

    useEffect(() => {
        setLoading(true)
        if (searchValue === undefined) {
            setSongs([])
            return
        }
        getTopSongs(searchValue).then((songs) => {
            setSongs(songs)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }, [searchValue])


    return (
        <>
            <Navbar
                serch={search}
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
                    {songs.length === 0 && searchValue && <h2>Nessuna canzone trovata per {artistName}</h2>}
                </>}
                {loading && <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>}
            </Grid>
        </>
    );
}

export default App;
