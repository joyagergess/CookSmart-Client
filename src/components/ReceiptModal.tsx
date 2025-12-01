import styles from "../styles/ReceiptModal.module.css";
interface Props {
  expense: any;
  onClose: () => void;
}

export default function ReceiptModal({ expense, onClose }: Props) {
  if (!expense) return null;

  const svg = `
  <svg width="280" height="220" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="white" stroke="black" stroke-width="2"/>
    
    <text x="50%" y="30" font-size="16" text-anchor="middle" font-weight="bold">
      ${expense.store?.toUpperCase() || "STORE"}
    </text>

    <text x="20" y="65" font-size="13">Date: ${expense.date || ""}</text>

    <text x="20" y="95" font-size="13">Amount:</text>
    <text x="180" y="95" font-size="13">$${expense.amount || "0"}</text>

 
    <g transform="translate(40, 120)">
      <rect x="0"  y="0" width="2" height="40" fill="black"/>
      <rect x="4"  y="0" width="1" height="40" fill="black"/>
      <rect x="7"  y="0" width="3" height="40" fill="black"/>
      <rect x="12" y="0" width="1" height="40" fill="black"/>
      <rect x="15" y="0" width="2" height="40" fill="black"/>
      <rect x="19" y="0" width="1" height="40" fill="black"/>
      <rect x="22" y="0" width="3" height="40" fill="black"/>
      <rect x="27" y="0" width="2" height="40" fill="black"/>
      <rect x="31" y="0" width="1" height="40" fill="black"/>
       <rect x="27" y="0" width="5" height="40" fill="black"/>
       <rect x="31" y="0" width="3" height="40" fill="black"/>
       <rect x="27" y="0" width="2" height="40" fill="black"/>
       <rect x="19" y="0" width="1" height="40" fill="black"/>
       <rect x="22" y="0" width="3" height="40" fill="black"/>
       <rect x="27" y="0" width="2" height="40" fill="black"/>
        <rect x="34" y="0" width="1" height="40" fill="black"/>
       <rect x="36" y="0" width="3" height="40" fill="black"/>
       <rect x="38" y="0" width="3" height="40" fill="black"/>


    </g>

    <text x="50%" y="190" font-size="11" text-anchor="middle">
      Thank you!
    </text>
  </svg>
`;



  const imageSrc = `data:image/svg+xml;base64,${btoa(svg)}`;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Receipt</h3>
        <img src={imageSrc} alt="Receipt" className={styles.image} />
        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
