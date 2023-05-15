import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { AtSign, Calendar, GitHub, Linkedin, MapPin, Paperclip } from "react-feather";
import { contractabi, contractadd } from "../ConnectWallet/contractinfo";
import styles from "./Display.module.css";
import { useContextAPI } from "index";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Image } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// asd
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

const Display = () => {
  const { active, account, library } = useWeb3React();
  const { LoggedInUser, setLoggedInUser } = useContextAPI();
  console.log({ LoggedInUser });
  const [UserData, setUserData] = useState("");
  const [userCV, setUserCV] = useState("");

  console.log({ userCV });
  const [DataMessage, setDataMessage] = useState({
    exists: false,
    message: "Loading",
  });

  const GetDisplayData = async () => {
    const signer = await library?.getSigner(account);
    const cont = await new ethers.Contract(contractadd, contractabi, signer);

    const displayCvContract = await cont.displayCv();
    const getCandCvs = await cont.getCandCvs();

    console.log({ displayCvContract });
    console.log({ getCandCvs });

    await axios
      .get(displayCvContract)
      .then((res) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>", { res });
        setUserCV(res.data);
      })
      .catch((err) => console.log(err));
    return;

    // console.log({ displayCv });
    // console.log({ getCandCvs });

    // const checkpersdetAddress = displayCv[0][1];

    // if (checkpersdetAddress == account) {
    //   const PersDetails = {
    //     persdetName: displayCv[0][0],
    //     persdetAddress: displayCv[0][1],
    //     persdetEmail: displayCv[0][2],
    //     persdetPhone: displayCv[0][3],
    //     personalStatement: displayCv[0][4],
    //     OtherkeysSkills: displayCv[0][5],
    //     hobbies: displayCv[0][6],
    //     summary: displayCv[0][7],
    //   };

    //   const Empstartdata = timeConverter(displayCv[1][3]?.toString()).timeshow;
    //   const Empenddate = timeConverter(displayCv[1][3]?.toString()).timeshow;

    //   const Employement = {
    //     jobTitle: displayCv[1][0],
    //     companyName: displayCv[1][1],
    //     companyLocation: displayCv[1][2],
    //     companystartDate: Empstartdata,
    //     companyendDate: Empenddate,
    //     achvResp: displayCv[1][5],
    //   };

    //   const Edustartdata = timeConverter(displayCv[2][1]?.toString()).timeshow;
    //   const Eduenddate = timeConverter(displayCv[2][2]?.toString()).timeshow;

    //   const Education = {
    //     SchoolorcollegeName: displayCv[2][0],
    //     SchoolorcollegestartDate: Edustartdata,
    //     SchoolorcollegeEndDate: Eduenddate,
    //     SchoolorcollegeDesc: displayCv[2][3],
    //   };

    //   const persdetPhone = "";
    //   console.log({ PersDetails, Employement, Education });

    //   setUserData({ PersDetails, Employement, Education });
    //   setDataMessage({ exists: true, message: "Data Exists" });
    // } else {
    //   setDataMessage({ exists: false, message: "Data does not Exist" });
    // }
  };

  const [Loading, setLoading] = useState(false);

  const [condidatesCVS, setCondidatesCVS] = useState([]);

  const strings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 20];
  const [currentPage, setCurrentPage] = useState(1);
  const CVsPerPage = 4;

  const totalPages = Math.ceil(condidatesCVS.length / CVsPerPage);

  const currentPageData = condidatesCVS.slice((currentPage - 1) * CVsPerPage, currentPage * CVsPerPage);

  //   console.log(condidatesCVS && condidatesCVS[0]);
  const call = async () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    setLoggedInUser(user);
    if (active && account && LoggedInUser.email && LoggedInUser.isCand == false) {
      console.log("admin");
      const signer = await library?.getSigner(account);
      const cont = await new ethers.Contract(contractadd, contractabi, signer);
      const res = await cont.getCandCvs();
      console.log({ res });

      let imgsarr = [];
      for (const item of res) {
        console.log({ item });
        const ressss = await axios.get(item);
        console.log(ressss.data);
        imgsarr.push(ressss?.data);
      }
      console.log({ imgsarr });
      setCondidatesCVS(imgsarr);
    }
  };

  useEffect(() => {
    call();
  }, []);

  useEffect(() => {
    if (active && account) {
      GetDisplayData();
    } else {
      setDataMessage({ exists: false, message: "Connect your wallet" });
    }
  }, [account]);

  console.log({ userCV });

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      {/* {LoggedInUser.email && LoggedInUser.isCand ? "cad" :  "admin"} */}
      {active && LoggedInUser?.email && LoggedInUser?.isCand == true && (
        <>
          <img style={{ margin: "10px" }} width={500} src={userCV} alt="Create your CV" />
          {/* {!DataMessage.exists && DataMessage.message} */}
          {/* {DataMessage.exists && (
            <div>
              <div className={styles.container}>
                <div className={styles.header}>
                  <p className={styles.heading}>
                    {UserData?.PersDetails?.persdetName}
                  </p>
                  <p className={styles.subHeading}>
                    {UserData?.PersDetails?.persdetAddress}
                  </p>
                  <p className={`text-dark`}>
                    {UserData?.PersDetails?.personalStatement}
                  </p>
                  <div className={styles.links}>
                    <a
                      className={styles.link}
                      href={`mailto:${UserData?.PersDetails?.persdetEmail}`}>
                      <AtSign /> {UserData?.PersDetails?.persdetEmail}
                    </a>
                  </div>
                </div>

                <div className={styles.main}>
                  <div className={styles.col1}>
                    <div
                      key={"workexp"}
                      draggable
                      className={`${styles.section}`}>
                      <div className={styles.sectionTitle}>Work Experience</div>
                      <div className={styles.content}>
                        <div className={`mt-3 ${styles.item}`}>
                          <p className={`p-0 m-0 ${styles.title}`}>
                            {UserData?.Employement?.jobTitle}
                          </p>
                          <p className={`p-0 m-0 ${styles.subTitle}`}>
                            {UserData?.Employement?.companyName}
                          </p>
                          <p className={`p-0 m-0`}>
                            {UserData?.Employement?.companyLocation}
                          </p>
                          <i className="border-bottom">
                            Achievements and Responsibilities:
                          </i>
                          <div className={`p-0 m-0 ${styles.content}`}>
                            <p className={styles.overview}>
                              {UserData?.Employement?.achvResp}
                            </p>
                          </div>
                          <div className={styles.date}>
                            <Calendar />{" "}
                            {UserData?.Employement?.companystartDate}-
                            {UserData?.Employement?.companyendDate}
                          </div>
                          <p className={styles.date}>
                            <MapPin /> Remote
                          </p>
                        </div>
                        <div
                          key={"education"}
                          draggable
                          className={`${styles.section} `}>
                          <div className={styles.sectionTitle}>Education</div>
                          <div className={styles.content}>
                            <div className={`p-0 mt-2 ${styles.item}`}>
                              <p className={`p-0 m-0 ${styles.title}`}>
                                {UserData?.Education?.SchoolorcollegeDesc}
                              </p>
                              <p className={`p-0 m-0 ${styles.subTitle}`}>
                                {UserData?.Education?.SchoolorcollegeName}
                              </p>
                              <div className={styles.date}>
                                <Calendar />{" "}
                                {UserData?.Education?.SchoolorcollegestartDate}-
                                {UserData?.Education?.SchoolorcollegeEndDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.col2}>

                    <div
                      key={"summary"}
                      draggable
                      className={`${styles.section} `}>
                      <div className={styles.sectionTitle}>Summary</div>
                      <div className={styles.content}>
                        <p className={styles.overview}>
                          {UserData.PersDetails.summary}
                        </p>
                      </div>
                    </div>
                    <div
                      key={"other"}
                      draggable
                      className={`${styles.section}`}>
                      <div className={styles.sectionTitle}>Others</div>
                      <div className={styles.content}>
                        <p className={styles.overview}>
                          <h5
                            className="m-0 p-0 fw-bold"
                            style={{ fontSize: "15px" }}>
                            Hobbies
                          </h5>
                          <p className="p-0 m-0">
                            {UserData.PersDetails.hobbies}
                          </p>
                        </p>
                        <p className={styles.overview}>
                          <h5
                            className="m-0 p-0 fw-bold"
                            style={{ fontSize: "15px" }}>
                            Other Skills
                          </h5>
                          <p className="p-0 m-0">
                            {UserData.PersDetails.OtherkeysSkills}
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </>
      )}
      {active && LoggedInUser.email && LoggedInUser.isCand == false && (
        <>
          {/* admin
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </div> */}

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {condidatesCVS && currentPageData.map((string) => <TransitionsModal imgLink={string} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default Display;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TransitionsModal({ imgLink }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <span onClick={handleOpen} style={{ cursor: "pointer" }}>
        <img style={{ margin: "10px" }} width={300} src={imgLink} alt="" />
      </span>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-minimize"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
                <path d="M15 5v2a2 2 0 0 0 2 2h2" />
                <path d="M5 15h2a2 2 0 0 1 2 2v2" />
                <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
              </svg>
            </IconButton> */}
            <div style={{ height: "80vh", overflow: "auto" }}>
              <img src={imgLink} alt="" width="100%" />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
