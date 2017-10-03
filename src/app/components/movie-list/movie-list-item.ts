import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
    selector: 'movie-list-item',
    templateUrl: './movie-list-item.html'
})
export class MovieListItemComponent {
    @Input() movie: Movie;
    @Input() selected: boolean;

    get title() {
        return this.movie.original_title;
    }
}