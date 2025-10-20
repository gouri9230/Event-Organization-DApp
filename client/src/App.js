import {useState, useEffect} from 'react';
import {ethers} from "ethers";
import abi from "./contracts/EventOrganizer.json";
import './App.css';

function App() {
  const [state, setState] = useState({provider: null, signer: null, contract: null});
  // useEffect() is a hook in react.js
  useEffect(()=> {
    const connectWallet = async () => {
      const contractAddress = "0x0f5E23837884933361B95568F83912bf07EfA3D6";
      const contractAbi = abi.abi;
      try {
        // metamask wallet injects an object in the browser called ethereum via window object, previously it used to inject web3.
        const { ethereum } = window;
        
        if (ethereum){
          // ask user to connect to wallet
          // this line opens the metamask wallet automatically when any user opens our website
          await ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          // state is set for below 3 variables, which were initially defined as null
          setState({provider, signer, contract});
        } else {
          alert("Please install MetaMask");
        }   
        
      } catch(error) {
        console.log("Failed to connect to wallet: ", error);
      }
    };
    connectWallet();
  }, []);

  console.log(state);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
