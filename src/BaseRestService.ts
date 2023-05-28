import axios from 'axios';
import { Artist, ArtistResult } from 'model/Artist';
import { Song, SongResult } from 'model/Song';

export async function getTopSongs(artistName: string, limit: number = 50): Promise<Song[]> {
    try {
        artistName = artistName.replace(' ', '+').toLocaleLowerCase();
        const response = await axios.get<SongResult>(`https://itunes.apple.com/lookup?id=${artistName}&entity=song&limit=${limit}`);
        console.log(response);
        let res = response?.data?.results || [];
        if (res.length > 0) {
            res.shift();
        }
        return res;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getArtist(artistName: string, limit: number = 10): Promise<Artist[]> {
    try {
        artistName = artistName.replace(' ', '+').toLocaleLowerCase();
        const response = await axios.get<ArtistResult>(`https://itunes.apple.com/search?term=${artistName}&attribute=artistTerm&entity=allArtist&limit=${limit}`);
        console.log(response);
        return response?.data?.results || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}
