import { Injectable } from "@angular/core";
import { SSEType } from "@interfaces/sse";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SseService {

    private _connection: EventSource;
    private _isConnected: boolean = false;
    
    private readonly sseUrl = `${environment.baseUrl}/sse`;

    private sseMap = new Map<SSEType, (data: any) => any>();

    constructor(
    ) { }

    connect(userId: string): void {
        if (!this._connection || this._connection.readyState === 2) {
            this._connection = new EventSource(`${this.sseUrl}/${userId}`);
            this.handleMessage();
            this.handleError(userId);
        }
    }

    close(): void {
        if (this._connection) {
            this._connection.close();
        }
        this._isConnected = false;
    }

    setMessageHandler(type: SSEType, handler: (data: any) => any) {
        if (!this.sseMap.get(type)) {
            this.sseMap.set(type, handler);
        }
    }

    get isConnected(): boolean {
        return this._isConnected;
    }

    private handleMessage(): void {
        this._connection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (this.sseMap.get(data.type)) {
                this.sseMap.get(data.type)(data.payload);
            }
        };
    }

    private handleError(userId: string): void {
        this._connection.onerror = (event) => {
            console.warn('Reconnect!', event);
            this.connect(userId);
        };
    }
}