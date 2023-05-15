import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { AtSign, Calendar, GitHub, Linkedin, MapPin, Paperclip } from "react-feather";
import { contractabi, contractadd } from "../ConnectWallet/contractinfo";
import styles from "./LiveDisplay.module.css";

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var timeshow = date + " " + month + " " + year;

  const monthplus = a.getMonth() + 1;
  const getCorrectMonth = monthplus <= 9 ? "0" + monthplus : monthplus;
  const correctDate = date <= 9 ? "0" + date : date;
  const correctHour = hour <= 9 ? "0" + hour : hour;
  const correctMint = min <= 9 ? "0" + min : min;
  var timeforinput = year + "-" + getCorrectMonth + "-" + correctDate + "T" + correctHour + ":" + correctMint;
  return { timeshow, timeforinput };
  // 2018-06-12T19:30
}

const LiveDisplay = ({ values, ref, workExp }) => {
  const { active, account, library } = useWeb3React();

  const [UserData, setUserData] = useState("");
  const [DataMessage, setDataMessage] = useState({
    exists: false,
    message: "Loading",
  });

  const GetDisplayData = async () => {
    const signer = await library?.getSigner(account);
    const cont = await new ethers.Contract(contractadd, contractabi, signer);

    const displayCv = await cont.displayCv();
    console.log({ displayCv });

    const checkpersdetAddress = displayCv[0][1];

    if (checkpersdetAddress == account) {
      const PersDetails = {
        persdetName: displayCv[0][0]?.toString(),
        persdetAddress: displayCv[0][1]?.toString(),
        persdetEmail: displayCv[0][2]?.toString(),
        persdetPhone: displayCv[0][3]?.toString(),
        personalStatement: displayCv[0][4]?.toString(),
        OtherkeysSkills: displayCv[0][5]?.toString(),
        hobbies: displayCv[0][6]?.toString(),
        summary: displayCv[0][7]?.toString(),
      };

      const Empstartdata = timeConverter(displayCv[1][3]?.toString()).timeshow;
      const Empenddate = timeConverter(displayCv[1][3]?.toString()).timeshow;

      const Employement = {
        jobTitle: displayCv[1][0]?.toString(),
        companyName: displayCv[1][1]?.toString(),
        companyLocation: displayCv[1][2]?.toString(),
        companystartDate: Empstartdata?.toString(),
        companyendDate: Empenddate?.toString(),
        achvResp: displayCv[1][5]?.toString(),
      };

      const Edustartdata = timeConverter(displayCv[2][1]?.toString()).timeshow;
      const Eduenddate = timeConverter(displayCv[2][2]?.toString()).timeshow;

      const Education = {
        SchoolorcollegeName: displayCv[2][0]?.toString(),
        SchoolorcollegestartDate: Edustartdata?.toString(),
        SchoolorcollegeEndDate: Eduenddate?.toString(),
        SchoolorcollegeDesc: displayCv[2][3]?.toString(),
      };

      const persdetPhone = "";
      console.log({ PersDetails, Employement, Education });

      setUserData({ PersDetails, Employement, Education });
      setDataMessage({ exists: true, message: "Data Exists" });
    } else {
      setDataMessage({ exists: false, message: "Data does not Exist" });
    }
  };

  useEffect(() => {
    if (active && account) {
      GetDisplayData();
    } else {
      setDataMessage({ exists: false, message: "Connect your wallet" });
    }
  }, []);
  useEffect(() => {
    if (active && account) {
      GetDisplayData();
    } else {
      setDataMessage({ exists: false, message: "Connect your wallet" });
    }
  }, [account]);

  return (
    <div>
      <div id="livepreview" className={styles.container}>
        <div className={styles.header}>
          <p className={styles.heading}>{values?.persdetName}</p>
          <p className={styles.subHeading}>{account}</p>
          <p className={`text-dark`}>{values?.personalStatement}</p>
          <div className={styles.links}>
            <a className={styles.link} href={`mailto:${values?.persdetEmail}`}>
              <AtSign /> {values?.persdetEmail}
            </a>
            <a className={styles.link} href={`tel:${values?.persdetPhone}`}>
              {values?.persdetPhone}
            </a>
            {/* <a className={styles.link}>
                <GitHub /> asdasd
              </a> */}
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.col1}>
            <div key={"workexp"} draggable className={`${styles.section}`}>
              <div className={styles.sectionTitle}>Work Experience</div>
              {workExp?.map((e, index) => {
                return (
                  <div className={`mt-3 ${styles.item}`}>
                    <p style={{ fontWeight: "bold",fontSize:"18px",fontFamily:"monospace" }}>Job {index + 1}</p>
                    <p className={`p-0 m-0 ${styles.title}`}>{e?.jobTitle}</p>
                    <p className={`p-0 m-0 ${styles.subTitle}`}>{e?.companyName}</p>
                    <p className={`p-0 m-0`}>location: {e?.companyLocation}</p>
                    <i className="border-bottom">Achievements and Responsibilities:</i>
                    <div className={`p-0 m-0 ${styles.content}`}>
                      <p className={styles.overview}>{e?.achvResp}</p>
                    </div>

                    <div className={styles.date}>
                      <Calendar /> {e?.companystartDate} to {e?.companyendDate}
                    </div>
                    <p className={styles.date}>
                      <MapPin /> Remote
                    </p>
                  </div>
                );
              })}
              <div className={styles.content}>
                <div key={"education"} draggable className={`${styles.section} `}>
                  <div className={styles.sectionTitle}>Education</div>
                  <div className={styles.content}>
                    <div className={`p-0 mt-2 ${styles.item}`}>
                      <p className={`p-0 m-0 ${styles.title}`}>{values?.SchoolorcollegeDesc}</p>
                      <p className={`p-0 m-0 ${styles.subTitle}`}>{values?.SchoolorcollegeName}</p>
                      <div className={styles.date}>
                        <Calendar /> {values?.SchoolorcollegestartDate}-{values?.SchoolorcollegeEndDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.col2}>
            {/* <div
                  key={"achievement"}
                  draggable
                  className={`${styles.section} `}>
                  <div className={styles.sectionTitle}>achievement</div>
                  <div className={styles.content}>
                    <ul className={styles.numbered}>
                      <li className={styles.point}>asdsd</li>
                      <li className={styles.point}>asdsd</li>
                    </ul>
                  </div>
                </div> */}

            <div key={"summary"} draggable className={`${styles.section} `}>
              <div className={styles.sectionTitle}>Summary</div>
              <div className={styles.content}>
                <p className={styles.overview}>{values?.summary}</p>
              </div>
            </div>
            <div key={"other"} draggable className={`${styles.section}`}>
              <div className={styles.sectionTitle}>Others</div>
              <div className={styles.content}>
                <p className={styles.overview}>
                  <h5 className="m-0 p-0 fw-bold" style={{ fontSize: "15px" }}>
                    Hobbies
                  </h5>
                  <p className="p-0 m-0">{values?.hobbies}</p>
                </p>
                <p className={styles.overview}>
                  <h5 className="m-0 p-0 fw-bold" style={{ fontSize: "15px" }}>
                    Other Skills
                  </h5>
                  <p className="p-0 m-0">{values?.OtherkeysSkills}</p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDisplay;
