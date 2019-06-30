import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  static API_END_POINT = environment.API;
  static NOT_FOUND = 404;
  static BAD_REQUEST = 400;
  static HTTP_UNPROCESSABLE_ENTITY = 422;

  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;
  private correctNotification = undefined;
  miStorage = window.sessionStorage;
  private isToken$: Subject<boolean> = new Subject();


  constructor(private http: HttpClient) {
    this.resetOptions();
  }


  post(endPoint: string, body?: Object): Observable<any> {
    console.log(body);
    return this.http.post(HttpService.API_END_POINT + endPoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        console.log(error)
        return this.handleError(error);
      })
    );
  }
  get(endpoint: string): Observable<any> {
    const headerDict = {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',

    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), (error => {
        return (error);
      })
    );
  }
  put(endpoint: string, body?: Object): Observable<any> {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }
  delete(endpoint: string): Observable<any> {
    return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  login(endPoint: string, user: Object): Observable<any> {
    return this.http.post(HttpService.API_END_POINT + endPoint, user, this.createOptions()).pipe(
      map(response => this.extractData(response, user)
      ), (error => {
        return (error);
      })
    );
  }
  validatorLogin() {
    return this.isToken$.asObservable();
  }
  showUserId() {
    return  sessionStorage.getItem('userId');
  }
  logout() {
    this.miStorage.removeItem('myToken');
    this.miStorage.removeItem('userId');
    this.miStorage.removeItem('username');

  }

  private extractData(response, user?): any {
    if (this.correctNotification) {

      this.correctNotification = undefined;
    }
   const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/json') !== -1) {
        if (user != null) {
           sessionStorage.setItem('username', JSON.parse(user).username);
          sessionStorage.setItem('userId', response.body.userid);
          this.isToken$.next(true);
        }
        return response.body;

      }
    } else {

      return response;
    }
  }
  private handleError(response): any {
    let error: { error: string; message: any; path: string };
    try {
      if (response.status === HttpService.NOT_FOUND) {
        error = {error: 'Not Found', message: response.error.message, path: ''};
      } else if (response.status === HttpService.BAD_REQUEST) {
        error = {error: 'Bad Request', message: response.error.message, path: ''};
      } else if (response.status === HttpService.HTTP_UNPROCESSABLE_ENTITY) {
        error = {error: 'Unprocessable', message: response.error.message, path: ''};
      } else {
        error = response.error;
      }

      return throwError(error);
    } catch (e) {

      return throwError(response.error);
    }
  }

  private resetOptions() {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }
  private createOptions(): any {
    const options: any = {
      headers: this.headers,
      params: this.params,
      'Content-Type': 'application/json; charset=utf-8',
      responseType: this.responseType,
      observe: 'response',

    };
    this.resetOptions();
    return options;
  }


}
