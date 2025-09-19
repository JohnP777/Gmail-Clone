export type EmailDateInput = string | number | Date;

export function formatEmailDate(dateInput: EmailDateInput): string {
  const date = normalizeToDate(dateInput);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isSameDay) {
    return formatTime(date);
  }

  return formatMonthDay(date);
}

function normalizeToDate(input: EmailDateInput): Date {
  if (input instanceof Date) return input;

  if (typeof input === "number") {
    return new Date(input);
  }

  // string
  const trimmed = input.trim();
  const numeric = Number(trimmed);
  if (!Number.isNaN(numeric)) {
    // Heuristic: if it's seconds vs milliseconds
    const ms = numeric < 10_000_000_000 ? numeric * 1000 : numeric;
    return new Date(ms);
  }

  return new Date(trimmed);
}

function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const mm = minutes < 10 ? `0${minutes}` : String(minutes);
  // e.g. 3:02pm
  return `${hours}:${mm}${ampm}`;
}

function formatMonthDay(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

export default formatEmailDate;


