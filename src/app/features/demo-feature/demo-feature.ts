import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Auth, user } from "@angular/fire/auth";
import {
    addDoc,
    collection,
    Firestore,
    serverTimestamp,
    getDocs,
    collectionData,
} from "@angular/fire/firestore";
import { AuthService } from "@core/services/auth.service";

@Component({
    selector: "app-demo-feature",
    imports: [AsyncPipe, JsonPipe],
    templateUrl: "./demo-feature.html",
    styleUrl: "./demo-feature.scss",
})
export class DemoFeature {
    private readonly auth = inject(Auth);
    private readonly authService = inject(AuthService);
    private readonly firestore = inject(Firestore);
    user = toSignal(user(this.auth));

    cards$ = computed(() => {
        const uid = this.user()?.uid;
        if (!uid) return null;
        const userCol = collection(this.firestore, uid);
        return collectionData(userCol);
    });

    async login() {
        await this.authService.signInWithGoogle();
    }

    async logout() {
        await this.authService.signOut();
    }

    async listCards() {
        if (!this.auth.currentUser) return;
        const userCol = collection(this.firestore, this.auth.currentUser.uid);
        const snapshot = await getDocs(userCol);
        console.log(snapshot.docs.map((doc) => doc.data()));
    }
}
