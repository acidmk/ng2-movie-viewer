import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie';


@Injectable()
export class MovieDbService {
    private API_URL = environment.apiUrl;
    private API_KEY = environment.apiKey;

    constructor(private http: Http) {}
    
    searchMovies(query: string): Observable<Movie[]> {
        let url = `${this.API_URL}/search/movie?query=${query}&api_key=${this.API_KEY}`;
        return this.http.get(url)
            .map(res => res.json().results || []);
    }

    getPopularMovies(): Observable<Movie[]> {       
        let url = `${this.API_URL}/discover/movie?sort_by=popularity.desc&api_key=${this.API_KEY}`;
        return this.http.get(url)
            .map(res => res.json().results || []);
    }

    getMovie(movieId: string): Observable<Movie> {
        let url = `${this.API_URL}/movie/${movieId}?api_key=${this.API_KEY}`;
        return this.http.get(url)
            .map(res => res.json());
    }
}
