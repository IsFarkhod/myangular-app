import { Injectable } from "@angular/core";
import { MyDocument } from './app/add/add.component';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    saveDataToJson(data: MyDocument): void {
        const jsonData = JSON.stringify(data);
        localStorage.setItem('myData', jsonData);
    }
    getDataFromJson(): MyDocument | null {
        const jsonData = localStorage.getItem('myData');
        return jsonData ? JSON.parse(jsonData) : null;
    }
}