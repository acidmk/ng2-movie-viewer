import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
    selector: 'movie-details-rating',
    templateUrl: './movie-details-rating.html',
    styleUrls: ['./movie-details-rating.css']
})
export class MovieDetailsRating {
    @Input() currentRate: number;
}