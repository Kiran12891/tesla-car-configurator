import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelConfig } from '../interfaces/model.interface';

@Injectable()
export class TeslaDataService {

    constructor(private httpClient: HttpClient) { }

    public getModelsConfigDetails(code: string): Observable<ModelConfig> {
        return this.httpClient.get<ModelConfig>('/options/' + code)
    }

    public getModelDataList(): Observable<Model[]> {
        return this.httpClient.get<Model[]>('/models')
    }

}
