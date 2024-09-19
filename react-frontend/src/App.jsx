import {useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users,setUsers] = useState([]);
  const hostUrl = import.meta.env.PROD ? window.location.href : "http://localhost:8080/";

  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`);
    const usersToJson = await response.json();
    console.log(usersToJson);
    setUsers(usersToJson);
  };


  const updateUserAdmin = async (e) => {
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}` , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({isAdmin: e.target.checked}),
    });
    await response.json();
    await fetchUsers();
  };

  const updateUserBadass = async (e) => {
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}` , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({isBadass: e.target.checked}),
    });
    await response.json();
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  },[]);


  return (
    <>
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
                  checked={user.isAdmin}
                  onChange={updateUserAdmin}
                />
              </td>
              <td>
                <input
                  data-id={user.id}
                  type="checkbox"
                  checked={user.isBadass}
                  onChange={updateUserBadass}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App
