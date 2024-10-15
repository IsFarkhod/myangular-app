import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import { PeriodicElement } from './app/element.model';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, snapshotEqual, updateDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private jsonUrl = "assets/data.json";

    constructor(private http: HttpClient) { }

    //constructor(private firestore: Firestore, private http: HttpClient) { }

    getData(): Observable<PeriodicElement[]> {
        return this.http.get<PeriodicElement[]>(this.jsonUrl);
    }

    /*getDocuments(): Observable<any[]> {
        const documentsRef = collection(this.firestore, 'documents');
        return from(getDocs(documentsRef)).pipe(
            map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })
            ))
        );
    }

    addDocuments(data: any) {
        const documentsRef = collection(this.firestore, 'documents');
        return addDoc(documentsRef, data);
    }

    updateDocuments(id: string, data: any) {
        const documentsRef = doc(this.firestore, 'documents', id);
        return updateDoc(documentsRef, data);
    }

    deleteDocuments(id: string) {
        const documentsRef = doc(this.firestore, 'documents', id);
        return deleteDoc(documentsRef);
    }*/

}