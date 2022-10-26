import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./components/Coin";

const URL = "https://api.coinstats.app/public/v1/coins?skip=0";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        // console.log(response.data.coins);
        setListOfCoins(response.data.coins);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <>
      <div className="App">
        <div className="cryptoHeader">
          <input
            type="text"
            placeholder="Your desired coin..."
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
        <div className="cryptoDisplay">
          {filteredCoins.map((coin) => {
            return (
              <Coin
                name={coin.name}
                icon={coin.icon}
                price={coin.price}
                symbol={coin.symbol}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
