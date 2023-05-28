import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { getArtist } from 'BaseRestService';
import { Artist } from 'model/Artist';
import * as React from 'react';

interface AutocompleteArtistProps {
    InputProps?: any;
    placeholder?: any;
    inputProps?: any;
    fullWidth?: any;
    defaultValue?: any;
    sx?: any;
    onBlur?: any;
    onKeyDown?: any;
}

export default function AutocompleteArtist(props: AutocompleteArtistProps) {
    const [value, setValue] = React.useState<Artist | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly Artist[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetch = React.useMemo(
        () =>
            debounce(
                (
                    request: { input: string },
                    callback: (results?: readonly Artist[]) => void,
                ) => {
                    getArtist(request.input).then((songs) => {
                        callback(songs)
                        setLoading(false)
                    }).catch((error) => {
                        console.log(error)
                        callback([])
                        setLoading(false)
                    })
                },
                400,
            ),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        setLoading(true)
        fetch({ input: inputValue }, (results?: readonly Artist[]) => {
            if (active) {
                let newOptions: readonly Artist[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.artistName + " (" + option.artistId.toString() + ")"
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText={inputValue?.length <= 0 ? "Inizia a digitare" : loading ? "Caricamento..." : "Nessun artista trovato"}
            onChange={(event: any, newValue: Artist | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...props}
                    id={params.id}
                    InputLabelProps={params.InputLabelProps}
                    inputProps={params.inputProps}
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <AccountCircleIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                <Box
                                    component="span"
                                >
                                    {option.artistName}
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {option.primaryGenreName}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                )
            }}
        />
    );
}