export const MessageType = {
  CHECK_PAGE: "CHECK_PAGE",
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export interface CheckPageMessage{
    type: typeof MessageType.CHECK_PAGE;
}

export interface PageStatusResponse{
    isProblem:boolean;
    isContest:boolean;
    isDiscuss:boolean;
    url:string;
}

