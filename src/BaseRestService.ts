import axios from 'axios';
import { Song, SongResult } from 'model/Song';

export async function getTopSongs(artistName: string, limit: number = 50): Promise<Song[]> {
    try {
        artistName = artistName.replace(' ', '+').toLocaleLowerCase();
        const response = await axios.get<SongResult>(`https://itunes.apple.com/search?term=${artistName}&attribute=allArtistTerm&entity=song&limit=${limit}`);
        console.log(response);
        return response?.data?.results || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}
