import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './Api.service';


@Injectable({
    providedIn: 'root'
})
export class ApisService extends ApiService {
    constructor(http: HttpClient, @Inject('baseUrl') private baseUrl: string) {
        super(http);
        this.server = `${baseUrl}`;
    }
}
