import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

//Indica si el usuario esta logueado o no
export class LoginState {
    userLoggedIn = signal(false);

    setLoggedInTrue() {
        this.userLoggedIn.set(true);
    }

    setLoggedInFalse(){
        this.userLoggedIn.set(false);
    }
}
