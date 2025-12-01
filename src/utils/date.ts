

export function daysUntil(dateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);

  const diff = target.getTime() - today.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export type ExpiryStatusType = 
  | "expired"
  | "today"
  | "tomorrow"
  | "soon"
  | "normal";

export interface ExpiryInfo {
  text: string;
  color: string;
  status: ExpiryStatusType;
  days: number;
}

export function getExpiryInfo(dateString: string): ExpiryInfo {
  const days = daysUntil(dateString);

  if (days < 0) {
    return { text: "Expired", color: "#e74c3c", status: "expired", days };
  }

  if (days === 0) {
    return { text: "Expires today", color: "#e67e22", status: "today", days };
  }

  if (days === 1) {
    return { text: "Expires tomorrow", color: "#f39c12", status: "tomorrow", days };
  }

  if (days <= 3) {
    return { text: `${days} days left`, color: "#f1c40f", status: "soon", days };
  }

  return { text: `${days} days left`, color: "#2ecc71", status: "normal", days };
}
