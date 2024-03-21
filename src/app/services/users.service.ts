import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private server: string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  public RegistrarUsuario(usuario: any) {
    return this.http.post(`${this.server}users`, usuario);
  }

  public ModificarUsuario(usuario: any){ 
    return this.http.put(`${this.server}users/${usuario.id}`, usuario); 
  }

  public EliminarUsuario(id: any){ 
    return this.http.delete(`${this.server}users/${id}`); 
  }

  public LeerTodos(){ 
    return this.http.get(`${this.server}users`); 
  }
}