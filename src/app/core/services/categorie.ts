import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private http = inject(HttpClient);

  private readonly API_URL =
    'https://stunning-bird-e22d84bb99.strapiapp.com/api/categories?populate=*';

  private readonly BASE_URL =
    'https://stunning-bird-e22d84bb99.strapiapp.com';


}
