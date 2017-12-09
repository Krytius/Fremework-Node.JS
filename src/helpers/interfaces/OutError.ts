export class OutError {
    public message: string;
    public code: number;
    public error?: boolean = true;
    public data?: Object = [];
    public token?: string
}