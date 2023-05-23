import axios from 'axios';
import { Song } from 'model/Song';

export async function getTopSongs(artistName: string, limit: number = 50): Promise<Song[]> {
    try {
        artistName = artistName.replace(' ', '+').toLocaleLowerCase();
        const response = await axios.get<Song[]>(`https://itunes.apple.com/search?term=${artistName}&entità=canzone&limit=${limit}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
