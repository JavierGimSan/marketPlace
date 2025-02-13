import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  onSubmit(formData: NgForm) {
    if(formData.form.invalid){
      alert("Correo o contraseña inválidos. Inténtelo de nuevo.");
      return;
    }
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.email;
    
    console.log(formData.form);
    console.log(enteredEmail, enteredPassword);
  }
}
