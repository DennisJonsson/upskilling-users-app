export const fetchAccounts = async (hostUrl,setAccounts) => {
    console.log("Fetching accounts")
    try {
        const response = await fetch(`${hostUrl}api/accounts`);

        //If (!response.ok) {
        //    throw new Error(`$response.statusText`);
       //}
            
        const accountsToJson = await response.json();
        console.log(accountsToJson);
        setAccounts(accountsToJson);
    } catch (error) {
        console.error("Error fetching accounts: ",error)
    }
    

};

export const updateAccount = async (e,hostUrl,setAccounts) => {
    console.log(e.target.name)
    const response = await fetch(`${hostUrl}api/accounts/${e.target.dataset.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name : e.target.value}),
    });
    await response.json();
    await fetchAccounts(hostUrl,setAccounts);
};

export const createUser = async (e,hostUrl,users,setAccounts) => {
    e.preventDefault()
    const response = await fetch(`${hostUrl}api/accounts`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ name: e.target.name.value }),
    });
    const newAccount = await response.json();

    setAccounts([...accounts, newAccount]);
};

export const deleteUser = async (e,hostUrl,setAccounts) => {
    await fetch(`${hostUrl}api/accounts/${e.target.dataset.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    });
    await fetchUsers(hostUrl,setAccounts);
}

