import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiUrl = "http://localhost:3000/user";
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.apiUrl);
  }
  getAllRole(){
    return this.http.get('http://localhost:3000/role');
  }
  getByCode(code:any){
    return this.http.get(this.apiUrl+"/"+code);
  }
  

proceedRegister (inputData:any){
  return this.http.post(this.apiUrl , inputData);
}

  removeUser(code:any ){
return this.http.delete(this.apiUrl + "/"+code )
  
}
updateUser (code:any , inputData:any){
  return this.http.put(this.apiUrl+"/"+code , inputData);
}
isloggedIn(){
  return sessionStorage.getItem("userName")!=null;
}
getUserRole(){
  return sessionStorage.getItem("userRole")!=null?sessionStorage.getItem("userRole")?.toString():"";
}


}
