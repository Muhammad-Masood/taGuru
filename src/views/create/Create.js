/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, createRef } from "react";
import InputControl from "../InputControl/InputControl";
import styles from "./Create.module.css";
import { X } from "react-feather";
import Resume from "../Resume/Resume";
import { contractadd, contractabi } from "../ConnectWallet/contractinfo";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import LiveDisplay from "../LiveDisplay/LiveDisplay";
import ChatBot from "./chatBot/ChatBot";
import { create } from "ipfs-http-client";
import { useScreenshot } from "use-react-screenshot";
import { Button, List, ListItem, TextField } from "@mui/material";
import html2canvas from "html2canvas";
const Create = () => {
  const [values, setValues] = useState({
    // pers details
    persdetName: "",
    persdetAddress: "",
    persdetEmail: "",
    persdetPhone: "",

    // work exp
    jobTitle: "",
    companyName: "",
    companyLocation: "",
    companystartDate: "",
    companyendDate: "",
    achvResp: "", // need to look at this one

    // education
    SchoolorcollegeName: "",
    SchoolorcollegeDesc: "",
    SchoolorcollegestartDate: "",
    SchoolorcollegeEndDate: "",

    // achievementsBody
    hobbies: "", // need to look at this one

    summary: "",

    OtherkeysSkills: "",
    personalStatement: "",
  });
  const { account, active, library } = useWeb3React();

  //CODE BLOCK FOR CHATBOX///////////////////////////////////////////////////////////

  const projectId = "2Ne3Tz73itt94vQ4ZhEInyiRQz3";
  const projectSecret = "199219aedb4bde3b5a6542fba994d4e6";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

  const ipfs = create({
    url: "https://ipfs.infura.io:5001",
    headers: {
      authorization,
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    try {
      // const pathcv = await resultcv.path.replace(/"|'/g, "");
      // const urlcv = `https://raghav.infura-ipfs.io/ipfs/${pathcv}`;
      // console.log(urlcv);
      !active && alert("Connect wallet");
      
      console.log({ values });
      await takeScreenshot(ref1.current);
      // await takeScreenshot2(liveDataRef.current);
      // await getLiveDataImage()
      const resultqna = await ipfs.add(image);
      // const resultcv = await ipfs.add(image2);
      await console.log("result", resultqna);
      const pathqna = await resultqna.path.replace(/"|'/g, "");
      const urlqna = `https://raghav.infura-ipfs.io/ipfs/${pathqna}`;
      
      console.log(urlqna);
      setOpen(false);
      
      html2canvas(document.getElementById("livepreview")).then(async (canvas) => {
        const imgurl = canvas.toDataURL()
        console.log(imgurl);
        const resultresumeprev = await ipfs.add(imgurl);
        const pathresumepreview = await resultresumeprev.path.replace(/"|'/g, "");
        const cvurl = `https://raghav.infura-ipfs.io/ipfs/${pathresumepreview}`;
        console.log(cvurl, [[chatbotAnswers], urlqna]);

        const signer = await library?.getSigner(account);
        const cont = await new ethers.Contract(contractadd, contractabi, signer);
        console.log({ cont });


        console.log(cvurl, [[chatbotAnswers], urlqna]);
        const createCall = await cont.inputCvDet(cvurl, [[chatbotAnswers], urlqna]);
        await createCall.wait();


      })

      // const createCall = await cont.inputCvDet(PersDetails, Employement, Education, urlqna, [[chatbotAnswers], urlqna]);
      // await createCall.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const getLiveDataImage = async () => {
    await takeScreenshot2(liveDataRef.current);
  };

  const ref1 = createRef(null);
  const liveDataRef = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const [image2, takeScreenshot2] = useScreenshot();
  const getImage = () => takeScreenshot(ref1.current);
  const [chatbotAnswers, setchatbotAnswers] = useState([]);

  //CODE BLOCK FOR CHATBOX///////////////////////////////////////////////////////////

  const sections = {
    basicInfo: "Personal Details",
    workExp: "Employement",

    education: "Education",
    achievement: "Hobbies",
    summary: "Reference",
    other: "Others",
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeSectionKey, setActiveSectionKey] = useState(Object.keys(sections)[0]);

  const nextSection = () => {
    let sec = activeSectionIndex + 1;
    setActiveSectionKey(Object.keys(sections)[sec]);
    setSectionTitle(Object.keys(sections)[sec]);
    setActiveSectionIndex(sec);
  };

  const [sectionTitle, setSectionTitle] = useState(sections[Object.keys(sections)[0]]);

  const handlePointUpdate = (value, index) => {
    const tempValues = { ...values };
    if (!Array.isArray(tempValues.points)) tempValues.points = [];
    tempValues.points[index] = value;
    setValues(tempValues);
  };

  const handleSubmission = async () => {
    setOpen(true);
  };

  // forms
  const basicInfoBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl
          label="Name"
          placeholder="Enter your full"
          value={values.persdetName}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, persdetName: event.target.value }));
          }}
        />
        <InputControl
          label="Address"
          value={account}
          placeholder=""
          onChange={(event) => setValues((prev) => ({ ...prev, persdetAddress: event.target.value }))}
          disabled
        />
      </div>

      <div className={styles.row}>
        <InputControl
          label="Email"
          value={values.persdetEmail}
          placeholder="Enter your email"
          onChange={(event) => setValues((prev) => ({ ...prev, persdetEmail: event.target.value }))}
        />
        <InputControl
          label="Enter phone"
          value={values.persdetPhone}
          placeholder="Enter your phone number"
          onChange={(event) => setValues((prev) => ({ ...prev, persdetPhone: event.target.value }))}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "left" }}>
        <button type="button" onClick={nextSection}>
          next
        </button>
      </div>
    </div>
  );

  const workExpBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl
          label="Job Title"
          placeholder="Enter job title "
          value={values.jobTitle}
          onChange={(event) => setValues((prev) => ({ ...prev, jobTitle: event.target.value }))}
        />
        <InputControl
          label="Company Name"
          placeholder="Enter company name"
          value={values.companyName}
          onChange={(event) => setValues((prev) => ({ ...prev, companyName: event.target.value }))}
        />
      </div>

      <div className={styles.row}>
        <InputControl
          label="Location"
          placeholder="Enter company location"
          value={values.companyLocation}
          onChange={(event) => setValues((prev) => ({ ...prev, companyLocation: event.target.value }))}
        />
      </div>
      <div className={styles.row}>
        <InputControl
          label="Start Date"
          type="date"
          placeholder="Enter start date of work"
          value={values.companystartDate}
          onChange={(event) => setValues((prev) => ({ ...prev, companystartDate: event.target.value }))}
        />
        <InputControl
          label="End Date"
          type="date"
          placeholder="Enter end date of work"
          value={values.companyendDate}
          onChange={(event) => setValues((prev) => ({ ...prev, companyendDate: event.target.value }))}
        />
      </div>

      <div className={styles.column}>
        <label>Achievements and Responsibilities</label>
        <InputControl
          placeholder="Describe your achievements and responsibilities"
          value={values.achvResp}
          onChange={(event) => setValues((prev) => ({ ...prev, achvResp: event.target.value }))}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "left" }}>
        <button type="button" onClick={nextSection}>
          next
        </button>
      </div>
    </div>
  );

  const educationBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        {/* <InputControl
              label="Description"
              value={values.title}
              placeholder="Enter description"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
            /> */}
        <InputControl
          label="College/School Name"
          value={values.SchoolorcollegeName}
          placeholder="Enter college/school name"
          onChange={(event) => setValues((prev) => ({ ...prev, SchoolorcollegeName: event.target.value }))}
        />
      </div>
      <InputControl
        label="Description"
        value={values.SchoolorcollegeDesc}
        placeholder="Enter description"
        onChange={(event) => setValues((prev) => ({ ...prev, SchoolorcollegeDesc: event.target.value }))}
      />

      {/* <InputControl
            label="College/School Name"
            value={values.college}
            placeholder="Enter college/school name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, college: event.target.value }))
            }
          /> */}
      <div className={styles.row}>
        <InputControl
          label="Start Date"
          type="date"
          placeholder="Enter start date of this education"
          value={values.SchoolorcollegestartDate}
          onChange={(event) => setValues((prev) => ({ ...prev, SchoolorcollegestartDate: event.target.value }))}
        />
        <InputControl
          label="End Date"
          type="date"
          placeholder="Enter end date of this education"
          value={values.SchoolorcollegeEndDate}
          onChange={(event) => setValues((prev) => ({ ...prev, SchoolorcollegeEndDate: event.target.value }))}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "left" }}>
        <button type="button" onClick={nextSection}>
          next
        </button>
      </div>
    </div>
  );

  const achievementsBody = (
    <div className={styles.detail}>
      <div className={styles.column}>
        <label> Your Hobbies</label>
        <InputControl
          placeholder="Enter Your Hobbies"
          value={values.hobbies}
          onChange={(event) => setValues((prev) => ({ ...prev, hobbies: event.target.value }))}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "left" }}>
        <button type="button" onClick={nextSection}>
          next
        </button>
      </div>
    </div>
  );

  const summaryBody = (
    <div className={styles.detail}>
      <InputControl
        label="Summary"
        value={values.summary}
        placeholder="Enter your Reference"
        onChange={(event) => setValues((prev) => ({ ...prev, summary: event.target.value }))}
      />
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "left" }}>
        <button type="button" onClick={nextSection}>
          next
        </button>
      </div>
    </div>
  );

  const otherBody = (
    <div className={styles.detail}>
      <InputControl
        label="Key Skills"
        value={values.OtherkeysSkills}
        placeholder="Enter key skills"
        onChange={(event) => setValues((prev) => ({ ...prev, OtherkeysSkills: event.target.value }))}
      />
      <InputControl
        label="Personal Statement"
        value={values.personalStatement}
        placeholder="Enter personal statement"
        onChange={(event) => setValues((prev) => ({ ...prev, personalStatement: event.target.value }))}
      />

      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "left" }}>
        <button type="button" onClick={handleSubmission}>
          Submit
        </button>
      </div>
    </div>
  );

  const generateBody = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo:
        return basicInfoBody;
      case sections.workExp:
        return workExpBody;

      case sections.education:
        return educationBody;
      case sections.achievement:
        return achievementsBody;
      case sections.summary:
        return summaryBody;
      case sections.other:
        return otherBody;
      default:
        return null;
    }
  };

  const resumeRef = useRef();

  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    // [sections.project]: {
    //   id: sections.project,
    //   sectionTitle: sections.project,
    //   details: [],
    // },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-xl-6">
            <div className={`border rounded ${styles.container}`}>
              <div className={styles.header}>
                {Object.keys(sections)?.map((key, index) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    className={`${styles.section} ${activeSectionKey === key ? styles.active : ""}`}
                    key={key}
                    onClick={() => {
                      setActiveSectionKey(key);
                      setSectionTitle(key);
                      setActiveSectionIndex(index);
                    }}
                  >
                    {sections[key]}
                  </div>
                ))}
              </div>

              <div className={styles.body}>
                <InputControl
                  label="Section"
                  placeholder="Enter section title"
                  value={sectionTitle}
                  onChange={(event) => setSectionTitle(event.target.value)}
                  disabled
                />

                {/* <div className={styles.chips}>
                {activeInformation?.details
                  ? activeInformation?.details?.map((item, index) => (
                      <div
                        className={`${styles.chip} ${
                          activeDetailIndex === index ? styles.active : ""
                        }`}
                        key={item.title + index}
                        onClick={() => setActiveDetailIndex(index)}
                      >
                        <p>
                          {sections[activeSectionKey]} {index + 1}
                        </p>
                        <X
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteDetail(index);
                          }}
                        />
                      </div>
                    ))
                  : ""}
              </div> */}

                {generateBody()}
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <ChatBot
              handleClose={handleClose}
              handleOpen={handleOpen}
              open={open}
              setOpen={setOpen}
              image={image}
              chatbotAnswers={chatbotAnswers}
              setchatbotAnswers={setchatbotAnswers}
            />
            <div ref={ref1}>
              <h2>Answered questions:</h2>
              <List>
                {Object.keys(chatbotAnswers).map((key) => (
                  <ListItem>
                    <TextField
                      sx={{ m: 1, width: "50ch" }}
                      id="outlined-basic"
                      label={`${key}`}
                      variant="filled"
                      size="small"
                      value={chatbotAnswers[key]}
                      margin="normal"
                    />
                  </ListItem>
                ))}
              </List>
            </div>
            {/* <img width={"100px"} src={image2} alt={"Screenshot"} /> */}
            <div>
              <div ref={liveDataRef}  style={{background:"white"}}>
                <LiveDisplay values={values} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Resume ref={resumeRef} sections={sections} information={resumeInformation} /> */}
    </>
  );
};

export default Create;
