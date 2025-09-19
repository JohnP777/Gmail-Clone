interface GmailError {
  response?: {
    status?: number;
    data?: {
      error?: string | { message?: string };
    };
  };
  status?: number;
  message?: string;
}

export function handleGmailError(err: unknown): { message: string; status: number } {
  const error = err as GmailError;
  
  if (error?.message === "RELINK_GOOGLE") {
    return { message: "Google access expired. Please re-connect Google.", status: 409 };
  }
  
  const errorData = error?.response?.data?.error;
  const msg = (typeof errorData === 'object' && errorData?.message) 
                ? errorData.message
                : (typeof errorData === 'string' ? errorData : '') ??
                  error?.message ?? 
                  "Failed to process Gmail request";
  const status = error?.response?.status ?? error?.status ?? 500;
  
  return { message: msg, status };
}

export function getErrorMessage(error: unknown): string {
  const gmailError = error as GmailError;
  const errorData = gmailError?.response?.data?.error;
  return (typeof errorData === 'object' && errorData?.message) 
           ? errorData.message
           : (typeof errorData === 'string' ? errorData : '') ??
             gmailError?.message ?? 
             "";
}

export function getErrorStatus(error: unknown): number {
  const gmailError = error as GmailError;
  return gmailError?.response?.status ?? gmailError?.status ?? 500;
}
