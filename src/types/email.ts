export type Email = {
  id: string;
  threadId: string | null;
  snippet: string;
  internalDate: string | null;
  timeSent: string | null;
  from: string | null;
  to: string | null;
  subject: string | null;
  date: string | null;
  labelIds: string[];
};

export type EmailDateInput = string | number | Date;
