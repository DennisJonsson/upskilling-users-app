export const fetchAccounts = async (hostUrl,setAccounts) => {
    console.log("Fetching accounts")
    try {
        const response = await fetch(`${hostUrl}api/accounts`);
            
        const accountsToJson = await response.json();
        console.log(accountsToJson);
        setAccounts(accountsToJson);
    } catch (error) {
        console.error("Error fetching accounts: ",error)
    }
    

};

export const updateAccount = async (e,hostUrl,setAccounts) => {
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

export const createAccount = async (e,hostUrl,accounts,setAccounts) => {
    e.preventDefault()
    const response = await fetch(`${hostUrl}api/accounts`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ name: e.target.accountName.value }),
    });
    const newAccount = await response.json();

    setAccounts([...accounts, newAccount]);
};

export const deleteAccount = async (e,hostUrl,setAccounts) => {
    await fetch(`${hostUrl}api/accounts/${e.target.dataset.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    });
    await fetchAccounts(hostUrl,setAccounts);
}

