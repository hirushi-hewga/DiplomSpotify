export interface IGenre {
  id: number,
  name: string,
  image: string
}

export interface IGenreCreate {
  name: string,
  image: File
}

export interface IGenreUpdate {
  id: number,
  name: string,
  image: File
}