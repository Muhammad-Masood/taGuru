import { useWeb3React } from "@web3-react/core";

import { Link } from "react-router-dom";
import { Injected } from "../ConnectWallet/Wallets";
import { Button } from "@mui/material";
// import { Injected } from '../features/Connectors';
// import { useContextAPI } from '../features/contextapi';

function BasicExample() {
  const { active, activate, library, account, deactivate, chainID } = useWeb3React();

  console.log({ account });
  console.log({ active });

  async function conToMetaMask() {
    if (typeof window.ethereum == "undefined") {
      alert("MetaMask is Not installed!");
    } else {
      try {
        await activate(Injected);
      } catch (error) {
        console.log(error);

        console.log(error);
      }
    }
  }

  const disWallet = async () => {
    try {
      await deactivate();
    } catch (error) {}
  };

  return (
    <>
      {/* <IntegrationWallets /> */}

      {active ? (
        <Button
          type="null"
          className="btn btn-primary px-4 rounded-pill  px-2 connectbutton"
          onClick={disWallet}
          variant="contained"
        >
          {account?.slice(0, 4)}...{account?.slice(-4)}
        </Button>
      ) : (
        <Button
          type="null"
          className="btn btn-primary px-4 rounded-pill  px-2 connectbutton"
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
