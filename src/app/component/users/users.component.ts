import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports:[NgFor, FormsModule],
  templateUrl: 'users.component.html'
})
export class UsersComponent {

  public Usuarios: any;
  public Nombres!: string;
  public Apellidos!: string;
  public Correo!: string;
  public Telefono!: string;
  public Direccion!: string;

  public IdModificar!: string;
  public NombresModificar!: string;
  public ApellidosModificar!: string;
  public CorreoModificar!: string;
  public TelefonoModificar!: string;
  public DireccionModificar!: string;

  constructor(public serviciomodal: NgbModal,
              private serviceUsuarios: UsersService) {
    this.CargarTodosLosUsuarios();
  }

  public AbrirModalUsers(contenido: any, bandera: boolean){
    this.serviciomodal.open(contenido, {size: 'lg'})
  }

  private CargarTodosLosUsuarios() {
    this.Usuarios = [];
    this.serviceUsuarios.LeerTodos().subscribe(
      (resultado: any) => {
        resultado.usuarios.map((user: any) => {
          var usuario = {
            id: user.id,
            nombres: user.nombres,
            apellidos: user.apellidos,
            correo: user.email,
            telefono: user.telefono,
            direccion: user.direccion
          }
          this.Usuarios.push(usuario);
        });
      }
    );
  }

  public EliminarUsuario(id: any) {
    Swal.fire({
      title: '¡Eliminar usuario!',
      text: '¿Desea en realidad eliminar el usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Espere, no',
      footer: '<a href>EML</a>'
    }).then((result) => {
      if (result.value) {
        this.serviceUsuarios.EliminarUsuario(id).subscribe( 
          (resultado: any) => {
            Swal.fire({
              title: '¡Resultado de la acciòn!',
              text: resultado.message,
              icon: 'info',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Entiendo',
              footer: '<a href>EML.</a>'
            });
            this.CargarTodosLosUsuarios();
          }
        );
      }
    });
  }

  public GuardarModificacionUsuarios() {
    var validacionCamposNoVacios = this.ValidarInformacionEnCamposModificar();
    var validacionCorreoValido = this.ValidarEsEmailValido(this.CorreoModificar);
    if (!validacionCamposNoVacios) {
      Swal.fire({
        title: '¡Resultado de la acciòn!',
        text: 'Complete toda la información.',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entiendo',
        footer: '<a href>EML.</a>'
      });
      return;
    }
    if (!validacionCorreoValido) {
      Swal.fire({
        title: '¡Resultado de la acciòn!',
        text: 'Ha digitado un correo no válido.',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entiendo',
        footer: '<a href>EML.</a>'
      });
      return;
    }
    Swal.fire({
      title: '¡Confirmar modificaciòn!',
      text: '¿Desea confirmar la modificaciòn del usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, modificar',
      cancelButtonText: 'Espere, no',
      footer: '<a href>EML</a>'
    }).then((result) => {
      if (result.value) {
        var usuario = {
          id: this.IdModificar,
          nombres: this.NombresModificar,
          apellidos: this.ApellidosModificar,
          email: this.CorreoModificar,
          telefono: this.TelefonoModificar,
          direccion: this.DireccionModificar
        }
        this.serviceUsuarios.ModificarUsuario(usuario).subscribe( 
          (resultado: any) => {
            Swal.fire({
              title: '¡Resultado de la acciòn!',
              text: resultado.message,
              icon: 'info',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Entiendo',
              footer: '<a href>EML.</a>'
            });
            if (resultado.usuario !== undefined) {
              this.serviciomodal.dismissAll();
              this.LimpiarCampos();  
              this.CargarTodosLosUsuarios();  
            }        
          }
        );
      }
    });    
  }

  public GuardarUsuarios() {
    var validacionCamposNoVacios = this.ValidarInformacionEnCampos();
    var validacionCorreoValido = this.ValidarEsEmailValido(this.Correo);
    if (!validacionCamposNoVacios) {
      Swal.fire({
        title: '¡Resultado de la acciòn!',
        text: 'Complete toda la información.',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entiendo',
        footer: '<a href>EML.</a>'
      });
      return;
    }
    if (!validacionCorreoValido) {
      Swal.fire({
        title: '¡Resultado de la acciòn!',
        text: 'Ha digitado un correo no válido.',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entiendo',
        footer: '<a href>EML.</a>'
      });
      return;
    }
    Swal.fire({
      title: '¡Confirmar registro!',
      text: '¿Desea confirmar el registro del usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'Espere, no',
      footer: '<a href>EML</a>'
    }).then((result) => {
      if (result.value) {
        var usuario = {
          nombres: this.Nombres,
          apellidos: this.Apellidos,
          email: this.Correo,
          telefono: this.Telefono,
          direccion: this.Direccion
        }
        this.serviceUsuarios.RegistrarUsuario(usuario).subscribe( 
          (resultado: any) => {
            Swal.fire({
              title: '¡Resultado de la acciòn!',
              text: resultado.message,
              icon: 'info',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Entiendo',
              footer: '<a href>EML.</a>'
            });
            if (resultado.usuario !== undefined) {
              this.serviciomodal.dismissAll();
              this.LimpiarCampos();  
              this.CargarTodosLosUsuarios();  
            }        
          }
        );
      }
    });
  }

  public AbrirModalModificarUsuarios(user: any, contenidoModificar: any, bandera: boolean) {
    this.serviciomodal.open(contenidoModificar, {size: 'lg'})
    this.IdModificar = user.id;
    this.NombresModificar = user.nombres;
    this.ApellidosModificar = user.apellidos;
    this.CorreoModificar = user.correo;
    this.TelefonoModificar = user.telefono;
    this.DireccionModificar = user.direccion;    
  }

  private ValidarInformacionEnCampos() {
    if (this.Nombres == "" || this.Nombres == null || this.Nombres == undefined ||
      this.Correo == "" || this.Correo == null || this.Correo == undefined ||
      this.Telefono == "" || this.Telefono == null || this.Telefono == undefined ||
      this.Direccion == "" || this.Direccion == null || this.Direccion == undefined) 
    {
      return false;
    } else {
      return true;
    }
  }

  private ValidarInformacionEnCamposModificar() {
    if (this.NombresModificar == "" || this.NombresModificar == null || this.NombresModificar == undefined ||
      this.CorreoModificar == "" || this.CorreoModificar == null || this.CorreoModificar == undefined ||
      this.TelefonoModificar == "" || this.TelefonoModificar == null || this.TelefonoModificar == undefined ||
      this.DireccionModificar == "" || this.DireccionModificar == null || this.DireccionModificar == undefined) 
    {
      return false;
    } else {
      return true;
    }
  }

  private LimpiarCampos() {
    this.Nombres = "";
    this.Apellidos = "";
    this.Correo = "";
    this.Telefono = "";
    this.Direccion = "";
    this.NombresModificar = "";
    this.ApellidosModificar = "";
    this.CorreoModificar = "";
    this.TelefonoModificar = "";
    this.DireccionModificar = "";
  }

  public ValidarCaracteresNumericosYMaxlength(id: string, event: KeyboardEvent) {
    var cajadetexto = document.getElementById(id) as HTMLInputElement;
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {    
      event.preventDefault();
    } else if(cajadetexto.value.length >= 10){
        event.preventDefault();
    }
  }

  public ValidarCaracteresAlfanumericosYMaxlength(event: KeyboardEvent, id: string) {
    var cajadetexto = document.getElementById(id) as HTMLInputElement;
    const pattern = /[.@0-9a-zA-Z_-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {    
      event.preventDefault();
    } else if(cajadetexto.value.length >= 80){
        event.preventDefault();
    }
  }

  private ValidarEsEmailValido(email: string) : boolean {
    var EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (EMAIL_REGEX.test(email)){
        return true;
    } else{
        return false;
    }
  }

  public ValidarCaracteresAlfabeticosYMaxlength(event: KeyboardEvent, id: string) {
    var cajadetexto = document.getElementById(id) as HTMLInputElement;
    const pattern = /[a-zA-Z ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {    
      event.preventDefault();
    } else if(cajadetexto.value.length >= 25){
        event.preventDefault();
    }
  }
}