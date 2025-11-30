import styles from "../styles/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>

      <header className={styles.header}>
        <div className={styles.logo}>CookSmart</div>

        <nav className={styles.nav}>
          <a href="#home">Home</a>
          <a href="#benefits">Benefits</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <h1>Welcome to CookSmart</h1>
          <p>Your platform to Shop, Save, Cook & Live Better!</p>
          <button className={styles.getStartedBtn}>Get started</button>
        </div>
      </section>

      <section className={styles.benefits} id="benefits">
        <h2>Why use our app</h2>

        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <h3>More Variety, Less Trips</h3>
            <p>Better planning means fewer store trips and more meal variety.</p>
          </div>

          <div className={styles.benefitCard}>
            <h3>More savings, Less waste</h3>
            <p>Automated detection of expiring items gives you direct savings.</p>
          </div>

          <div className={styles.benefitCard}>
            <h3>More convenience</h3>
            <p>Simplify pantry, recipes, meal plans & shopping lists in one app.</p>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks} id="features">
        <h2>How it works</h2>

        <div className={styles.howGrid}>
          <div className={styles.howCard}>
            <h3>PANTRY MANAGER</h3>
            <p>Store & track your daily items with auto-reminders for expiring foods.</p>
          </div>

          <div className={styles.howCard}>
            <h3>INGREDIENTS & RECIPES</h3>
            <p>Add recipes & let CookSmart tell you what ingredients you already have.</p>
          </div>

          <div className={styles.howCard}>
            <h3>MEAL PLANNER</h3>
            <p>Create weekly meal plans that match your pantry to reduce waste.</p>
          </div>

          <div className={styles.howCard}>
            <h3>GROCERY LISTS</h3>
            <p>Generate smart shopping lists instantly based on your meal plan.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer} id="contact">
        <h3>About CookSmart</h3>

        <p className={styles.footerText}>
          CookSmart helps households shop smarter, reduce food waste, and plan meals
          effortlessly. Our mission is to make everyday cooking simple, efficient,
          and enjoyable for everyone.
        </p>

        <div className={styles.footerContact}>
          <p>Email: support@cooksmart.com</p>
          <p>Website: www.cooksmart.com</p>
        </div>
      </footer>

    </div>
  );
}
