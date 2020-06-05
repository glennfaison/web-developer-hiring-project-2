import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) {
    if (!this._accessToken) {
      this._accessToken = localStorage.getItem('widget-inc-jwt');
    }
  }

  private _accessToken: any;
  set accessToken(value) {
    this._accessToken = value;
  }

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  static findHttpError(error: any): string {
    let errorMessage = 'Oops! An error occured.';
    if (typeof error === typeof errorMessage) { errorMessage = error; }
    try {
      if (typeof error.message === typeof errorMessage) { errorMessage = error.message; }
      if (typeof error.error === typeof errorMessage) { errorMessage = error.error; }
      if (typeof error.error.message === typeof errorMessage) { errorMessage = error.error.message; }
      if (typeof error.error.message.inner === typeof errorMessage) { errorMessage = error.error.message.inner; }
      if (typeof error.error.message.inner.message === typeof errorMessage) { errorMessage = error.error.message.inner.message; }
    } catch (e) { }
    return errorMessage;
  }

  private setOptions(withAuth: boolean) {
    if (withAuth) {
      this.options.headers = new HttpHeaders({
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': `Bearer ${this._accessToken}`,
        'Content-Type': `application/json`,
      });
    }
    if (withAuth && !this._accessToken) {
      this.options.headers.delete('Authorization');
    }
  }

  private getQueryParamsFromObject(obj: any): string {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (!!obj[key]) { params.set(key, obj[key]); }
    }
    return params.toString();
  }

  async get(url: string, requestParams: object, withAuth: boolean = true): Promise<any> {
    try {
      this.setOptions(withAuth);
      const params: string = this.getQueryParamsFromObject(requestParams);
      const res = await this.http.get<any>(`${url}?${params}`, this.options).toPromise();
      if (!!res.error) { throw res; }
      return res;
    } catch (error) {
      return error;
    }
  }

  async post(url: string, requestBody: object, withAuth: boolean = true): Promise<any> {
    try {
      this.setOptions(withAuth);
      const res = await this.http.post<any>(`${url}`, requestBody, this.options).toPromise();
      if (!!res.error) { throw res; }
      return res;
    } catch (error) {
      return error;
    }
  }

  async put(url: string, searchParams: object, requestBody: object, withAuth: boolean = true): Promise<any> {
    try {
      this.setOptions(withAuth);
      const params: string = this.getQueryParamsFromObject(searchParams);
      const res = await this.http.put<any>(`${url}?${params}`, requestBody, this.options).toPromise();
      if (!!res.error) { throw res; }
      return res;
    } catch (error) {
      return error;
    }
  }

  async delete(url: string, requestBody: object, withAuth: boolean = true): Promise<any> {
    try {
      this.setOptions(withAuth);
      const params: string = new HttpParams(requestBody).toString();
      const options = { ...this.options, body: params };
      const res = await this.http.delete<any>(`${url}`, options).toPromise();
      if (!!res.error) { throw res; }
      return res;
    } catch (error) {
      return error;
    }
  }

}
