import React, {  useState } from 'react';


export default function Table({ data   }) {
  const [customers, setCustomers] = useState(data.customers);
  const [transactions, setTransactions] = useState(data.transactions);
  const [nameFilter, setNameFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');

  const filterTable = () => {
      return transactions.filter(transaction => {
          const customer = customers.find(c => c.id === transaction.customer_id);
          const matchesName = customer.name.toLowerCase().includes(nameFilter.toLowerCase());
          const matchesAmount = !amountFilter || transaction.amount >= amountFilter;
          return matchesName && matchesAmount;
      });
  };

    return <>
     <div className='d-flex justify-content-center align-items-center flex-column'>
            <input 
                type="text" 
                id="customer-name" 
                placeholder="Enter customer name" 
                value={nameFilter} 
                onChange={(e) => setNameFilter(e.target.value)}
                className='form-control w-25 mt-2'
            />

            <input 
                type="number" 
                id="transaction-amount" 
                placeholder="Enter minimum transaction amount" 
                value={amountFilter} 
                onChange={(e) => setAmountFilter(e.target.value)}
                className='form-control w-25 mt-2'

            />
            </div>
            <div className="d-flex justify-content-center align-items-center">

            <table className='table mt-5 table-hover w-75 text-center'>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Transaction Date</th>
                        <th>Transaction Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filterTable().map(transaction => {
                        const customer = customers.find(c => c.id === transaction.customer_id);
                        return (
                            <tr key={transaction.id}>
                                <td>{customer.name}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>

  </>
  
}
