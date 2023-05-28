import { AppBar, Box, Container, Grid, Toolbar } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Artist } from 'model/Artist';
import AutocompleteArtist from './AutocompleteArtist';

type NavbarProps = {
    serch: (id: string | undefined, name: string) => void
    loading?: boolean
}

export default function Navbar(props: NavbarProps) {
    const { serch, loading } = props
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(1),
            width: '90ch',
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(1),
            width: '90ch',
        },

    }));
    const onChange = (artist?: Artist) => {
        if (artist?.artistId) { serch(artist?.artistId.toString(), artist.artistName) }
    }

    const StyledInputBase = styled(AutocompleteArtist)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            // padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '90ch',
            },
            [theme.breakpoints.up('lg')]: {
                width: '90ch',
            },
        },
        width: "100%",
    }));


    return (
        <>
            <AppBar position="fixed" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Search>
                                    <StyledInputBase
                                        placeholder="Cerca"
                                        fullWidth
                                        sx={{ input: { color: 'white' } }}
                                        onChange={onChange}
                                    />
                                </Search>
                            </Grid>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
            {/* space for the AppBar */}
            <Box sx={{ minHeight: 75 }} />
        </>
    );
}