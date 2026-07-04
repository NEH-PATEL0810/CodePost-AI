import { API } from "./endpoints";
import { ApiError } from "./errors";

export class ApiClient {
    static async post<TRequest, TResponse>(
        endpoint: string,
        body: TRequest
    ): Promise<TResponse> {

        const url = `${API.BASE_URL}${endpoint}`;

        console.log("POST URL:", url);
        console.log("POST BODY:", body);

        let response: Response;

        try {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            console.log("Response status:", response.status);

        } catch (error) {

            console.error("Fetch failed:", error);

            throw error;
        }

        if (!response.ok) {

            const text = await response.text();

            console.error(text);

            throw new ApiError(text, response.status);
        }

        return response.json();
    }
}