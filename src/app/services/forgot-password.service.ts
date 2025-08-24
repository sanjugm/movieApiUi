import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type ChangePassword = {
  password: string,
  repeatPassword: string,
}

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  public BASE_URL = "http://localhost:8080";

  http = inject(HttpClient);

  verifyEmailService(email: string): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/forgotPassword/verifyMail/${email}`, null, {
      responseType: 'text' as 'json'
    });
  }

  verifyOtpService(otp: string, email: string): Observable<string> {
    console.log("OTP = ", otp);
    return this.http.post<string>(`${this.BASE_URL}/forgotPassword/verifyOtp/${otp}/${email}`, null, {
      responseType: 'text' as 'json'
    });
  }

  changePasswordService(changePassword: ChangePassword, email: string): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/forgotPassword/changePassword/${email}`, changePassword, {
      responseType: 'text' as 'json'
    });
  }
}
  export type changePassword = {
    password: string,
    repeatPassword: string,
}
