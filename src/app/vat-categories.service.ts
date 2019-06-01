import { Injectable } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  private vatForCategory = {
    Food: 0.1,
    Drinks: 0.2
  };

  constructor() { }

  public getVat(category: VatCategory): number {
    return this.vatForCategory[category];
  }
}
