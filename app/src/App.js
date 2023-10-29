import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
const {Provider} = require( '@project-serum/anchor') ;
const {web3}  = require( '@project-serum/anchor') ;

// Connect to the local Solana network
const network = 'http://localhost:8899';
const connection = new Connection(network, 'confirmed');

// Fetch the smart contract's program ID and account address
const programId = new PublicKey('your-local-program-id');
const jackpotFundsAddress = new PublicKey('your-local-jackpot-funds-address');

// Create a JackpotFundsController component
const JackpotFundsController = () => {
  const [jackpotFunds, setJackpotFunds] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Create a provider and a program instance
  const provider = new Provider(
    connection,
    new web3.Wallet('your-local-wallet-private-key'),
    Provider.defaultOptions(),
  );
  const program = new Program('./path/to/your/local/idl.json', programId, provider);

  // Fetch the current jackpot funds when the component mounts
  useEffect(() => {
    fetchFunds();
  }, []);

  // Fetch the current jackpot funds
  const fetchFunds = async () => {
    const funds = await program.account.jackpotFunds.fetch(jackpotFundsAddress);
    setJackpotFunds(funds.funds.toNumber());
  };

  // Add funds to the jackpot
  const handleClick = async () => {
    await program.rpc.addFunds(parseInt(inputValue), {
      accounts: {
        jackpotFunds: jackpotFundsAddress,
      },
    });

    fetchFunds();
    setInputValue('');
  };

  return (
    <div>
      <p>Jackpot funds: {jackpotFunds}</p>
      <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button onClick={handleClick}>Add Funds</button>
    </div>
  );
};

export default JackpotFundsController;



// import React, { useState, useEffect } from 'react';
// import { Connection, PublicKey } from '@solana/web3.js';
// import { Program, Provider, web3 } from '@project-serum/anchor';

// // Connect to the local Solana network
// const network = 'http://localhost:8899';
// const connection = new Connection(network, 'confirmed');

// // Fetch the smart contract's program ID and account address
// const programId = new PublicKey('35E5UcdXztKMAftibKAnfpgKkvr5jEY47Nr8hV11QBJB');
// const jackpotFundsAddress = new PublicKey('5NdnLSRgu4rPrZ1pnEvWZVqcRqCpoQJfpepEwu4HN5NS');

// // Create a JackpotFundsController component
// const JackpotFundsController = () => {
//   const [jackpotFunds, setJackpotFunds] = useState(0);
//   const [inputValue, setInputValue] = useState('');

//   // Create a provider and a program instance
//   const provider = new Provider(
//     connection,
//     new web3.Wallet([39,34,14,236,152,56,13,210,56,142,227,62,235,46,173,1,87,94,31,178,87,214,163,195,161,139,145,39,142,183,198,123,218,20,221,66,198,103,5,206,61,128,174,195,75,247,171,176,135,40,49,161,147,119,187,8,3,114,80,67,80,243,51,208]),
//     Provider.defaultOptions(),
//   );
//   const program = new Program('./idl.json', programId, provider);

//   // Fetch the current jackpot funds when the component mounts
//   useEffect(() => {
//     fetchFunds();
//   }, []);

//   // Fetch the current jackpot funds
//   const fetchFunds = async () => {
//     const funds = await program.account.jackpotFunds.fetch(jackpotFundsAddress);
//     setJackpotFunds(funds.funds.toNumber());
//   };

//   // Add funds to the jackpot
//   const handleClick = async () => {
//     await program.rpc.addFunds(parseInt(inputValue), {
//       accounts: {
//         jackpotFunds: jackpotFundsAddress,
//       },
//     });

//     fetchFunds();
//     setInputValue('');
//   };

//   return (
//     <div>
//       <p>Jackpot funds: {jackpotFunds}</p>
//       <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} />
//       <button onClick={handleClick}>Add Funds</button>
//     </div>
//   );
// };

// export default JackpotFundsController;