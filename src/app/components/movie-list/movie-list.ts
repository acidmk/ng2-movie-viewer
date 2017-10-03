import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.html',
    styleUrls: ['./movie-list.css']
})
export class MovieListComponent {
    @Input() movies: Movie[];
    @Input() selected: Movie;
    @Output() select = new EventEmitter<Movie>();

    isSelected(movie) {
        return this.selected && this.selected.id === movie.id;
    }
}