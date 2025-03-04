import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class ErrorImage {
    private errorImageUrl = "/assets/images/error_image.jpg";

    getErrorImage(){
        return this.errorImageUrl;
    }
}