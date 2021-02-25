import { AuthService } from '@services/auth.service';

export function initFactory(authService: AuthService): () => Promise<any> {
    return (): Promise<any> => {
        return authService.initUser$().toPromise();
    }
}