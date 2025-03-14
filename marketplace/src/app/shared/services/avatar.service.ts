import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class AvatarService {
    private httpClient = inject(HttpClient);

    loadAvatar(username: string){
        return this.httpClient.get(`https://ui-avatars.com/api/?name=${username}`);
    }
}