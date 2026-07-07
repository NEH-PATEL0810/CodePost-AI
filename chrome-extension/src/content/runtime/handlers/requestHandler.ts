export class RequestHandler {
    async handle(): Promise<any> {
        console.log("[RequestHandler]\nHandling Request");
        return {
            success: true,
            version: "0.1"
        };
    }
}
