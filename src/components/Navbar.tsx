import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { AppBar, Box, Container, Grid, IconButton, InputAdornment, InputBaseProps, TextField, Toolbar } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { FocusEvent, useState } from 'react';

type NavbarProps = {
    serch: (searchValue: string) => void
}

export default function Navbar(props: NavbarProps) {
    const { serch } = props
    const [value, setValue] = useState<string>("")
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
            width: 'auto',
        },
    }));
    const onChange: InputBaseProps['onBlur'] = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        setValue(event.target.value)
    }


    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(TextField)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            // padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '60ch',
                '&:focus': {
                    width: '70ch',
                },
            },
            [theme.breakpoints.up('lg')]: {
                width: '90ch',
                '&:focus': {
                    width: '100ch',
                },
            },
        },
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
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        fullWidth
                                        defaultValue={value}
                                        sx={{ input: { color: 'white' } }}
                                        onBlur={onChange}
                                        onKeyDown={(e: any) => {
                                            if (e.key === 'Enter') {
                                                if (e.target?.value) {
                                                    serch(e.target?.value)
                                                    setValue(e.target?.value)
                                                }
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="search"
                                                    onClick={() => serch(value)}
                                                >
                                                    <SendIcon sx={{ color: "white" }} />
                                                </IconButton>
                                            </InputAdornment>
                                        }}
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