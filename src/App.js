import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {

  const [ coins, setCoins ] = useState([]);
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=50&page=1&sparkline=false')
    .then((results) => {
      setCoins(results.data);
    })
    .catch(err => alert('error!'))
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => {
    return coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  })

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">search a currency</h1>
        <form>
          <input type="text" className="coin-input" value={search} onChange={handleChange} placeholder="search..."/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h} 
          volume={coin.total_volume}/>
        )
      })}
    </div>
  );
}

export default App;
