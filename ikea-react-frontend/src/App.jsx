import { updateUser, createUser, deleteUser,fetchUsers} from './apiCalls/ikea-user-api'
import { updateAccount, createAccount, deleteAccount,fetchAccounts} from './apiCalls/ikea-account-api'
import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const hostUrl = "http://localhost:8080/";


  useEffect(() => {
    console.log("Use effect running");
    fetchUsers(hostUrl,setUsers);
    //fetchAccounts(hostUrl,setAccounts);
  }, []);
  
  return (
    <>
      <h1>New User</h1>
      <form onSubmit={(e) => createUser(e,hostUrl,users,setUsers)}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />
        <label htmlFor='isAdmin'>Is Admin</label>
        <input type='checkbox' name='isAdmin' id='isAdmin' />
        <label htmlFor='isBadass'>Is Badass</label>
        <input type='checkbox' name='isBadass' id='isBadass'/>
        <input type='submit' id='submitButton'/>
      </form>
      <br></br>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Is Admin</th>
            <th>Is Badass</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <p>{user.name}</p>
              </td>
              <td>
                <input
                  data-id={user.id}
                  type="checkbox"
                  name="isAdmin"
                  checked={user.isAdmin}
                  onChange={(e) => updateUser(e,hostUrl,setUsers)}
                />
              </td>
              <td>
                <input
                  data-id={user.id}
                  type="checkbox"
                  name="isBadass"
                  checked={user.isBadass}
                  onChange={(e) => updateUser(e,hostUrl,setUsers)}
                />
              </td>
              <td>
                <button data-id={user.id} onClick={(e) => deleteUser(e,hostUrl,setUsers)}>Delete</button>
              </td>
              <td>
                {accounts.map(account => (
                  <div key={account.id}>
                    <label>
                      <input 
                        type="checkbox"
                        onChange={(e) => assignAccount(user.id,account.id,e.target.checked)}
                      />
                      {account.name}
                    </label>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App
