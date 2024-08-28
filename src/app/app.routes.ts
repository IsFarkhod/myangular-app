import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AppComponent } from './app.component';
import { ReadComponent } from './read/read.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    { path: '', component: ReadComponent },
    { path: 'add', component: AddComponent },
    { path: 'edit', component: EditComponent }
];