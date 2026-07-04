export interface GenerateRequest{
    title:string,
    difficulty:string;
    description:string;
    examples:string[];
    constraints:string[];
    language:string;
    code:string;
    url:string;
}

export interface GenerateResponse{
    success: boolean;
    result:{
        markdown:string;
        metadata:{
            provider:string;
            version:string;
        };
    };
}