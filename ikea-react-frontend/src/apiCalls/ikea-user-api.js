export const fetchUsers = async (hostUrl,setUsers) => {
    const response = await fetch(`${hostUrl}api/users`);
    const usersToJson = await response.json();
    console.log(usersToJson);
    setUsers(usersToJson);
};

export const updateUser = async (e,hostUrl,setUsers) => {
    console.log(e.target.name)
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ [e.target.name]: e.target.checked }),
    });
    await response.json();
    await fetchUsers(hostUrl,setUsers);
};

export const createUser = async (e,hostUrl,users,setUsers) => {
    e.preventDefault()
    const response = await fetch(`${hostUrl}api/users`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ name: e.target.name.value, isAdmin: e.target.isAdmin.checked, isBadass: e.target.isBadass.checked }),
    });
    const newUser = await response.json();

    setUsers([...users, newUser]);
};

export const deleteUser = async (e,hostUrl,setUsers) => {
    await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    });
    await fetchUsers(hostUrl,setUsers);
}

