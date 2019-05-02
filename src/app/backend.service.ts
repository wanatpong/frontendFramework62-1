import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

const authServiceUrl = "https://backend-framework62-wanatpong.herokuapp.com/";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const helper = new JwtHelperService();

@Injectable({
  providedIn: "root"
})
export class BackendService {
  public httpOptionsWithToken;

  constructor(private http: HttpClient) {
    this.httpOptionsWithToken = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("id_token")
      })
    };
  }

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
      .pipe(
        tap(data => {
          this.setSession(data.token);
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(
        authServiceUrl + "login/login",
        { username, password },
        httpOptions
      )
      .pipe(
        tap(data => {
          this.setSession(data.token);
        })
      );
  }

  private setSession(token) {
    localStorage.setItem("id_token", token);
    this.httpOptionsWithToken = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("id_token")
      })
    };
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  verifyToken() {
    const token = localStorage.getItem("id_token");
    return this.http
      .post<any>(authServiceUrl + "login/verifyToken", { token }, httpOptions)
      .pipe();
  }

  public isLoggedIn(): Boolean {
    const token = localStorage.getItem("id_token");
    return !helper.isTokenExpired(token);
  }

  public decodeToken() {
    const token = localStorage.getItem("id_token");
    if (this.isLoggedIn()) {
      return helper.decodeToken(token);
    } else {
      return false;
    }
  }

  countAllUser() {
    return this.http
      .get<any>(authServiceUrl + "user/list-count", httpOptions)
      .pipe();
  }

  getListUser(pageNumber: number) {
    return this.http
      .get<any>(authServiceUrl + "user/list/" + pageNumber, httpOptions)
      .pipe();
  }
}
