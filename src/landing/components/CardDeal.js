import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Introducing TAG Tokens
        {/* <br className="sm:block hidden" /> in few easy
        steps. */}
      </h2>
      <p style={{ color: "#62C4C8" }} className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Candidates will be rewarded with TAG tokens for sharing their resumes. TAG tokens can be used as currency for
        purchasing goods and services with TA Guru or exchanged with other cryptocurrencies. TAG tokens benefit Clients
        and Recruiters by reducing recruitment costs, Improving trust, and enhancing the credibility of their profiles
        on the blockchain.
      </p>

      {/* <Button styles={`mt-10`} /> */}
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
