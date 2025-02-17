import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

//Indica si el usuario esta logueado o no
export class LoginState {
    userLoggedIn = signal(false);

    setTrue() {
        this.userLoggedIn.set(true);
    }
}
