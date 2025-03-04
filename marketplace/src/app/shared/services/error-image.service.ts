import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class ErrorImage {
    private errorImageUrl = "https://assets.grok.com/anon-users/18218e6d-9824-42cd-a551-d1b91865bc0a/o7DjW8S3un17FYj2-generated_image.jpg";

    getErrorImage(){
        return this.errorImageUrl;
    }
}