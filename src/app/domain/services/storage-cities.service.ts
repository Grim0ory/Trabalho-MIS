import { CityHistoricError} from "../errors/city-search.error";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
  })

export class StorageService {
    private _storage: Storage | null = null
    

    constructor(private storage: Storage) {
        this.init();
      }

    
    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }

    async set(key: string, value: any) {
        this._storage?.set(key, value);
    }


    async remove(key: string){
        this._storage?.remove(key);
    }

    async getCities() {
        const cities = []
        if(await this._storage.length() == 0){
            throw new CityHistoricError();
        }
        this._storage.forEach((value, key, index) => {
            cities.push(value)
        });
        return cities
    }

    

}