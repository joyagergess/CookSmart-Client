import styles from "../styles/AiModal.module.css";


interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function AiModal({ isOpen, onClose, children }: AiModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
