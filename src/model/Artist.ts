export interface ArtistResult {
    results: Artist[],
    resultCount: number,
}

export interface Artist {
    wrapperType: string,
    artistType: string,
    artistName: string,
    artistLinkUrl: string,
    artistId: number,
    amgArtistId: number,
    primaryGenreName: string,
    primaryGenreId: number,
}