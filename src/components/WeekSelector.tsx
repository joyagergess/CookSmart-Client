import styles from "../styles/WeekSelector.module.css";

interface Props {
  weekStart: Date;
  onChange: (newStart: Date) => void;
}

function formatWeekRange(start: Date): string {
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const month = start.toLocaleString("en-US", { month: "long" });

  return `${start.getDate()} - ${end.getDate()} ${month}`;
}

export function WeekSelector({ weekStart, onChange }: Props) {
  const prevWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() - 7);
    onChange(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() + 7);
    onChange(newDate);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.arrowBtn} onClick={prevWeek}>{"<"}</button>
      <span className={styles.range}>{formatWeekRange(weekStart)}</span>
      <button className={styles.arrowBtn} onClick={nextWeek}>{">"}</button>
    </div>
  );
}
