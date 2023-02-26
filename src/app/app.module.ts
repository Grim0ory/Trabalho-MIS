import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
//importando o ionic storage para usar para pegar as cidades já pesquisadas
import { IonicStorageModule } from '@ionic/storage-angular'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from './domain/services/search-city.service';
import { LoadWeatherService } from './domain/services/load-weather.service';
import { FakeWeatherRepository } from './data/fake/fake-weather-repository';
import { LocalCityRepository } from './data/local/local-city-repository';
import { RemoteWeatherRepository } from './data/remote/remote-weather-repository';

const createSearchCityService = () => {
  return new SearchCityService(new LocalCityRepository())
}

const createLoadWeatherService = (http: HttpClient) => {
  return new LoadWeatherService(new RemoteWeatherRepository(http))
}

/*const createLoadWeatherService = () => {
  return new LoadWeatherService(
    new FakeWeatherRepository()
  );
}*/


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), HttpClientModule, AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SearchCityService, useFactory: createSearchCityService },
    { provide: LoadWeatherService, useFactory: createLoadWeatherService, deps: [HttpClient] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
