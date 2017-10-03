import { TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { cold } from 'jasmine-marbles';
import { MovieDbService } from './movie-db';
import { environment } from '../../environments/environment';

describe('Service: MovieDbService', () => {
    let service: MovieDbService;
    let http: any;
    let API_URL = environment.apiUrl;
    let API_KEY = environment.apiKey;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Http, useValue: jasmine.createSpyObj('Http', ['get']) },
                MovieDbService,
            ],
        });

        service = TestBed.get(MovieDbService);
        http = TestBed.get(Http);
    });

   
    const movies = {
        results: [
        { id: '111', original_title: "test", poster_path: "a", overview: "aaa", vote_average: 7.0 },
        { id: '222', original_title: "test1", poster_path: "b",  overview: "bbb", vote_average: 5.0 }
        ]
    };
    
    const query = "test";

    it('should call the search api and return the search results', () => {

        const httpResponse = {
            json: () => movies,
        };

        const response = cold('-a|', { a: httpResponse });
        const expected = cold('-b|', { b: movies.results });
        http.get.and.returnValue(response);

        expect(service.searchMovies(query)).toBeObservable(expected);
        expect(http.get).toHaveBeenCalledWith(
            `${API_URL}/search/movie?query=${query}&api_key=${API_KEY}`
        );
    });

    it('should call the get popular api and return the results', () => {

        const httpResponse = {
            json: () => movies,
        };

        const response = cold('-a|', { a: httpResponse });
        const expected = cold('-b|', { b: movies.results });
        http.get.and.returnValue(response);

        expect(service.getPopularMovies()).toBeObservable(expected);
        expect(http.get).toHaveBeenCalledWith(
            `${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
        );
    });
});