export class OutError {
    public message: string;
    public code: number;
    public error?: boolean = true;
    public data?: any = [];
    public token?: string
}