import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from './app/element.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private jsonUrl = "assets/data.json";

    constructor(private http: HttpClient) { }

    getData(): Observable<PeriodicElement[]> {
        return this.http.get<PeriodicElement[]>(this.jsonUrl);
    }

}