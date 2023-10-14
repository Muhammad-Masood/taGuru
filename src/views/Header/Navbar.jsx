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
      let imgsarr = [];
      for (const item of res) {
        const ressss = await axios.get(item);
        imgsarr.push(ressss?.data);
      }
      setCondidatesCVS(imgsarr);
    }
  };

  const { active, activate, library, account, deactivate, chainID } = useWeb3React();

  async function conToMetaMask() {
    if (typeof window.ethereum == "undefined") {
      alert("MetaMask is Not installed!");
    } else {
      try {
        const chainId = await Injected.getChainId();
        if(chainId != "0x13881"){
          alert("Please switch to Mumbai Testnet.");
        } else {
          await activate(Injected);
          localStorage.setItem("isWalletConnected", true);
          call();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const disWallet = () => {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (error) {}
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "false") {
        try {
          console.log("connecting wallet...");
          await conToMetaMask();
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad().then(() => console.log("wallet connected.")).catch((error) => console.log(error));
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
