import { HttpErrorResponse } from '@angular/common/http'; //Lo he importado también en el archivo main.ts
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoginState } from '../../shared/services/login-state.service';
import { TokenService } from '../../shared/services/token.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent{

  // private httpClient = inject(HttpClient);
  // private apiUrlBase = environment.apiUrlBase;
  private token = inject(TokenService);
  private loginService = inject(LoginService)
  

  // DECLARACIÓN DE ERRORES (VALIDACIÓN DE DATOS)
  emailEmpty = false;
  emailFormat = false;
  passwordEmpty = false;
  passwordShort = false;

  isFetching = signal(false); //SIGNAL PARA CARGAR EL LOADER.

  // DECLARACIÓN DE ERRORES (SOLUCITUD HTTP)
  errorServer = signal(false);
  errorAuthentication = signal(false);
  errorOthers = signal (false);

  constructor(private router: Router, private loginState: LoginState){}


  onSubmit(formData: NgForm) {
    this.emailEmpty = false;
    this.emailFormat = false;
    this.passwordEmpty = false;
    this.passwordShort = false;

    this.isFetching.set(true);
    this.errorServer.set(false);
    this.errorAuthentication.set(false);
    this.errorOthers.set(false);

    const emailErrors = formData.form.controls['email'].errors;
    const passwordErrors = formData.form.controls['password'].errors;

    if (formData.form.invalid) {
      console.log(formData.form.controls['email'].errors);

      // POSIBLES ERRORES EN EL EMAIL  
      if(emailErrors?.['required']){
        this.emailEmpty = true;
      }else if(emailErrors?.['pattern']){
        this.emailFormat = true;
      }

      // POSIBLES ERRORES EN LA CONTRASEÑA
      if(passwordErrors?.['required']){
        this.passwordEmpty = true;
      }else if (passwordErrors?.['minlength']){
        this.passwordShort = true;
      }
      this.isFetching.set(false);
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    

    this.loginService.login(enteredEmail, enteredPassword).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log('login exitoso', response);
        this.token.saveToken(response.jwt);
        this.loginState.setLoggedInTrue();
        this.router.navigate(['/products']);
      },
      // MANEJO DE ERRORES 400, 500 Y OTROS
      error: (error: HttpErrorResponse) => {
        if(error.status === 400){
          console.log("Error en el login", error);
          this.errorAuthentication.set(true);
        } else if (error.status === 500){
            console.log("Error en el servidor", error);
            this.errorServer.set(true);
        } else {
            console.log("Otros errores", error)
            this.errorOthers.set(true);
        }
        this.isFetching.set(false);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });
  }
}
