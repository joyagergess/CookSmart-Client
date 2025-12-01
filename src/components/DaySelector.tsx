import styles from "../styles/DaySelector.module.css";

interface Props {
  selected: number;
  onChange: (day: number) => void;
}

const days = [
  { label: "Mon", value: 0 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 3 },
  { label: "Fri", value: 4 },
  { label: "Sat", value: 5 },
  { label: "Sun", value: 6 },
];

export function DaySelector({ selected, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      {days.map((d) => (
        <button
          key={d.value}
          className={`${styles.dayBtn} ${selected === d.value ? styles.active : ""}`}
          onClick={() => onChange(d.value)}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}
