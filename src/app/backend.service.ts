import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";

const authServiceUrl = "https://backend-framework62-wanatpong.herokuapp.com/";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class BackendService {
  constructor(private http: HttpClient) {}

  register(
    rank: string,
    first_name: string,
    last_name: string,
    id_mil: string,
    unit_name: string,
    username: string,
    password: string
  ): Observable<any> {
    return this.http
      .post<any>(
        authServiceUrl + "login/register",
        { rank, first_name, last_name, id_mil, unit_name, username, password },
        httpOptions
      )
      .pipe();
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(
        authServiceUrl + "login/login",
        { username, password },
        httpOptions
      )
      .pipe();
  }
}
