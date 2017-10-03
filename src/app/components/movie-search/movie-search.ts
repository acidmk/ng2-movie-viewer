import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'movie-search',
    templateUrl: './movie-search.html',
    styleUrls: ['./movie-search.css']
})

export class MovieSearchComponent {
    @Output() search = new EventEmitter<string>();    
}