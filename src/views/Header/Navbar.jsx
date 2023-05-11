import { useWeb3React } from "@web3-react/core";

import { Link } from "react-router-dom";
import { Injected } from "../ConnectWallet/Wallets";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useContextAPI } from "index";
// import { Injected } from '../features/Connectors';
// import { useContextAPI } from '../features/contextapi';

function BasicExample() {
  const { LoggedInUser, setLoggedInUser } = useContextAPI();
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

  // useEffect(() => {
  //   call();
  // }, []);
  const { active, activate, library, account, deactivate, chainID } = useWeb3React();

  console.log({ account });
  console.log({ active });

  async function conToMetaMask() {
    if (typeof window.ethereum == "undefined") {
      alert("MetaMask is Not installed!");
    } else {
      try {
        await activate(Injected);
        localStorage.setItem("isWalletConnected", true);
        call();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const disWallet = async () => {
    try {
      await deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (error) {}
  };
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(Injected);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);
  return (
    <>
      {/* <IntegrationWallets /> */}

      {active ? (
        <Button
          type="null"
          className="btn btn-primary px-4 rounded-pill connectbutton"
          onClick={disWallet}
          variant="contained"
        >
          {account?.slice(0, 4)}...{account?.slice(-4)}
        </Button>
      ) : (
        <Button
          type="null"
          className="btn btn-primary px-4 rounded-pill connectbutton"
          onClick={conToMetaMask}
          variant="contained"
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}
export default BasicExample;
