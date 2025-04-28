export interface FormData {
  name: string;
  email: string;
  phone?: string;
  idea: string;
}

export interface SubmitStatus {
  success?: boolean;
  message?: string;
}

export interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export interface ValidationErrors {
  name: string
  email: string
  idea: string
}