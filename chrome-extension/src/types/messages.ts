import type{
    ProblemData
} from "./problem";

export const MessageType = {
  PING: "PING",
  CHECK_PAGE: "CHECK_PAGE",
  EXTRACT_PROBLEM: "EXTRACT_PROBLEM",
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export interface CheckPageMessage{
    type: typeof MessageType.CHECK_PAGE;
}

export interface ExtractProblemMessage{
    type: typeof MessageType.EXTRACT_PROBLEM;
}


export interface PageStatusResponse{
    isProblem:boolean;
    isContest:boolean;
    isDiscuss:boolean;
    url:string;
}

export interface ProblemResponse{
    problem:ProblemData;
}

