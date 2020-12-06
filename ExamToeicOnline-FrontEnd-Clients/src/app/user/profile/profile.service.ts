import { User } from "./../../model/user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ProfileService {
  api: string = "";
  httpOptions: any;


  constructor(private httpClient: HttpClient) {
    this.api = "https://localhost:5001/api/users/update/";
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
  }

  updateProfile(userProfile: User) {
    var formData = new FormData();
    formData.append("id", userProfile.id);
    formData.append("fullname", userProfile.fullname);
    formData.append("email", userProfile.email);
    formData.append("phone", userProfile.phoneNumber);
    formData.append("birthday", userProfile.birthDate.toString());

    formData.append("image", userProfile.image);

    return this.httpClient.put<any>(this.api, formData).subscribe((data) => {
      console.log(data);
    });
  }
}
