import { HttpClient } from '@angular/common/http'; //Lo he importado también en el archivo main.ts
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoginState } from '../../shared/services/login-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent{
  private httpClient = inject(HttpClient);

  constructor(private router: Router, private loginState: LoginState){}

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      alert('Correo o contraseña inválidos. Inténtelo de nuevo.');
      return;
    }
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(formData.form);
    console.log(enteredEmail, enteredPassword);

    this.httpClient.post('http://localhost:1337/api/auth/local', { //Devuelve un observable, recordar suscribirme.
      identifier: enteredEmail,
      password: enteredPassword,
    }).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log('login exitoso', response);
        localStorage.setItem('token', response.jwt);
        this.loginState.setTrue();
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.log("Error en el login", error);
      }
    });
  }
}