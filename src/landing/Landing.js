import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import Chat from "./constants/chat";

const Landing = () => (
  <div className="bg-primary w-full overflow-hidden">
    <Chat></Chat>
    <div
      style={{
        background: "rgb(108,42,198)",
        background: "linear-gradient(90deg, rgba(108,42,198,1) 31%, rgba(72,35,143,1) 55%, rgba(13,33,69,1) 100%)",
      }}
      className={`${styles.paddingX} ${styles.flexCenter}`}
    >
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div
      style={{
        background: "rgb(108,42,198)",
        background: "linear-gradient(90deg, rgba(108,42,198,1) 31%, rgba(72,35,143,1) 55%, rgba(13,33,69,1) 100%)",
      }}
      className={`bg-primary ${styles.flexStart}`}
    >
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    <div
      style={{
        background: "rgb(108,42,198)",
        background: "linear-gradient(90deg, rgba(108,42,198,1) 31%, rgba(72,35,143,1) 55%, rgba(13,33,69,1) 100%)",
      }}
      className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}
    >
      <div className={`${styles.boxWidth}`}>
        <Stats />
      </div>
    </div>

    <div
      style={{
        background: "#08213F",
        // background: "linear-gradient(90deg, rgba(108,42,198,1) 31%, rgba(72,35,143,1) 55%, rgba(13,33,69,1) 100%)",
      }}
      className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}
    >
      <div className={`${styles.boxWidth}`}>
        <Business />
        <Billing />
      </div>
    </div>
    <div
      style={{
        background: "#08213F",
        // background: "linear-gradient(90deg, rgba(108,42,198,1) 31%, rgba(72,35,143,1) 55%, rgba(13,33,69,1) 100%)",
      }}
      className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}
    >
      <div className={`${styles.boxWidth}`}>
        <CardDeal />
      </div>
    </div>

    <div style={{ backgroundColor: "black" }} className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Testimonials />
        <Clients />
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
);

export default Landing;
