import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

import { Movie } from '../../models/movie';

@Component({
    selector: 'movie-details',
    templateUrl: './movie-details.html',
    styleUrls: ['./movie-details.css']
})
export class MovieDetailsComponent {
    @Input() movie: Movie;
    private POSTER_PATH = environment.posterPath;

    get poster() {
        return this.POSTER_PATH + this.movie.poster_path;
    }

    get title() {
        return this.movie.original_title;
    }

    get overview() {
        return this.movie.overview;
    }

    get currentRate() {
        return this.movie.vote_average;
    }
}