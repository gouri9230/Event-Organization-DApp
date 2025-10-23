import {useState, useEffect} from 'react';
import {ethers} from "ethers";
import abi from "./contracts/EventOrganizer.json";
import Buy from "./components/buyTickets";
import CreateEvent from './components/createEvent';
import EventLists from "./components/EventDetails";
import './App.css';

function App() {
  // useState => React Hook that adds state to functional components, always returns an array with two elements.
  // 1st is the variable that stores our data
  // 2nd is the function name that updates the variable.
  const [state, setState] = useState({provider: null, signer: null, contract: null,});
  const [account, setAccount] = useState("None");
  const [owner, setOwner] = useState("None");
  // useEffect() is a hook in react.js
  useEffect(()=> {
    const connectWallet = async () => {
      const contractAddress = "0xE5C8aAD4B4c0b2549111A2D07a1a4B7F1432DB99";
      const contractAbi = abi.abi;
      try {
        // metamask wallet injects an object in the browser called ethereum via window object, previously it used to inject web3.
        const { ethereum } = window;
        // if metamask is installed
        if (ethereum){
          // ask user to connect to wallet
          // this line opens the metamask wallet automatically when any user opens our website
          const account = await ethereum.request({ method: "eth_requestAccounts"});
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          // use function to set value into state variable, whenever this function is called, react re-renders the component with updated data.
          // we cannot directly modify the state variable, it should always be through its function
          setAccount(account[0]);
          setState({provider, signer, contract});

          const ownerAddress = await contract.owner();
          setOwner(ownerAddress.toLowerCase());
        } else {
          alert("Please install MetaMask");
        }   
      } catch(error) {
        console.log("Failed to connect to wallet: ", error);
      }
    };
    connectWallet();
  }, []); // empty array: function component runs only once, after mounting, we dont want this to re-render everytime, so empty array.

  //console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <p class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      {account.toLowerCase() === owner ? (
        <>
        <div className="container"><CreateEvent state = {state}/></div>
        <div className="container"><EventLists state={state}/></div>
        </>) : ( <>
    <div className="container"><EventLists state={state}/></div>
    <div className="container"><Buy state = {state}/></div>
    </>)}
    </div>
);
}

export default App;
