import { getExpiryInfo } from "../utils/date";

export default function ExpiryTag({ expiryDate }: { expiryDate: string }) {
  const { text, color } = getExpiryInfo(expiryDate);

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "6px",
        background: color + "22",   
        color,
        fontSize: "0.85rem",
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  );
}
