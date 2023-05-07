import { apple, bill, google } from "../assets";
import styles, { layout } from "../style";
import video1 from "../assets/promoVideo.mp4";
import "./Billings.css";
const Billing = () => (
  <div id="aboutus">
    <video
      className="video"
      controls
      type="video/mp4"
      style={{
        width: "70%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.7)",
        margin: "auto",
      }}
    >
      <source src={video1}></source>
      <track></track>
    </video>
  </div>
);

export default Billing;
