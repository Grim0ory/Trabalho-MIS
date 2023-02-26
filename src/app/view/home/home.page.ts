import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../../domain/entities/city.model';
import { SearchCityService } from '../../domain/services/search-city.service';
import { StorageService } from '../../domain/services/storage-cities.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  errorMessage = null;
  nenhuma_cidade_pesquisada = null;
  cities: City[] = [];
  localstorage: City[] = [];

  constructor(
    private readonly cityService: SearchCityService,
    private  storageService: StorageService,
    private readonly router: Router
  ) { }

  async onSearch(query: string) {
    try {
      this.errorMessage = null;
      this.cities = await this.cityService.searchByName(query)
    } catch (error) {
      this.errorMessage = error.message
    }
  }

  async onSelect(city: City) {
    this.storageService.set(city.name, city)
    await this.router.navigateByUrl(`/weather/${city.id}`, { replaceUrl: true })
  }

  async historic(){
      try{
        this.nenhuma_cidade_pesquisada = null
        this.localstorage = await this.storageService.getCities()
      } catch(error){
        this.nenhuma_cidade_pesquisada = error.message
      }
  }

  async deleteHistoric(name: string){
    await this.storageService.remove(name);
    this.historic()
  }

  ionViewDidEnter() {
    this.historic()
  }

}
