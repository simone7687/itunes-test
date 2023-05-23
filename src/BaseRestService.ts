import axios from 'axios';

async function getUser(artistName: string) {
    try {
        artistName = artistName.replace(' ', '+').toLocaleLowerCase();
        const response = await axios.get(`https://itunes.apple.com/search?term=${artistName}&entità=canzone&limit=50`);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
