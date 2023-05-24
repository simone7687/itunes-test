import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Song } from 'model/Song';

type SongCardProps = {
    song: Song
}

export default function SongCard(props: SongCardProps) {
    const { song } = props

    return (
        <Grid item>
            <Card elevation={24} sx={{ width: { md: 700, xs: 450 } }}>
                <CardHeader
                    avatar={
                        <Avatar src={song.artworkUrl100} />
                    }
                    title={song.trackName ? "Brano: " + song.trackName : ""}
                    subheader={song.collectionName ? "Album: " + song.collectionName : ""}
                />
            </Card>
        </Grid>
    )
}