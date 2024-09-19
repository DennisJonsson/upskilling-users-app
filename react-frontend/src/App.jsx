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

  const updateUser = async (e) => {
    console.log(e.target.name)
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}` , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({[e.target.name]: e.target.checked}),
    });
    await response.json();
    await fetchUsers();
  };

  const createUser = async (e) => {
    e.preventDefault()
    const response = await fetch(`${hostUrl}api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({name: e.target.name.value, isAdmin: e.target.isAdmin.checked, isBadass: e.target.isBadass.checked}),
    });
    const newUser = await response.json();

    setUsers([...users, newUser]);
  };

  const deleteUser = async (e) => {
    await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    await fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  },[]);


  return (
    <>
    <h1>New User</h1>
    <form onSubmit={createUser}>
      <label htmlFor='name'>Name</label>
      <input type='text' name='name' id='name'/>
      <label htmlFor='isAdmin'>Is Admin</label>
      <input type='checkbox' name='isAdmin' />
      <label htmlFor='isBadass'>Is Badass</label>
      <input type='checkbox' name='isBadass'/>
      <input type='submit' />
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
                  onChange={updateUser}
                />
              </td>
              <td>
                <input
                  data-id={user.id}
                  type="checkbox"
                  name="isBadass"
                  checked={user.isBadass}
                  onChange={updateUser}
                />
              </td>
              <td>
                <button data-id={user.id} onClick={deleteUser}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App
