export interface MoviesInterface {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export class Result {
  adult: boolean = false;
  backdrop_path!: string;
  genre_ids: number[] = [];
  id!: number;
  original_language!: string;
  original_title!: string;
  overview!: string;
  popularity!: number;
  poster_path!: string;
  release_date!: Date;
  title!: string;
  video: boolean = false;
  vote_average!: number;
  vote_count!: number;
}
