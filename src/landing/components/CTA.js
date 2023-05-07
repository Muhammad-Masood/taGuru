import styles from "../style";
import Button from "./Button";

const CTA = () => (
  <section
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
  >
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Let’s try our service now!</h2>
      <p style={{ color: "white" }} className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Join our community now! Start gaining the ultimate experience of recruitment with TA GURU.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <button
        style={{ color: "white", backgroundColor: "#62C4C8" }}
        className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
      >
        Book a consultation
      </button>
      <button
        style={{ color: "white", backgroundColor: "#62C4C8", marginLeft: "15px" }}
        className={`py-4  px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
      >
        Contact us
      </button>
    </div>
  </section>
);

export default CTA;
