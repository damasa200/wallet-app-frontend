const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  
   data.mp((item) => {
    const tableRow = document.createElement("tr");

    //title 
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);
    
    // category
    const categoryTd = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd );

    // category
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(new Data (item.date).toISOString());
    dateTd.appendChild( dateText);
    tableRow.appendChild(dateTd);

     // category
    const valueTd = document.createElement("td");
    const valueText = document.createTextNode(
      new Intl.NumberFormat('pt-BR', {
       style: 'currency',
       currency: 'BRL'
      }).format(item.value)
    );

    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd); 
    
    // delete
    const deleTd = document.createElement("td");
    const deleText = document.createTextNode("Deletar");
    deleTd.appendChild( deleText);
    tableRow.appendChild(deleTd);

    // tabele add tablerow 
    table.appendChild(tableRow);   
});


}

const renderFinanceElements = (data) => {
  const totalLitems = data.length;
  const revenues = data 
     filter((item)=> Number(item.value) > 0);
     reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data 
     filter((item)=> Number(item.value) > 0);
     reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;


  // Render Total Items
const financeCard1 = document.getElementById("finance-card-1");
const totalElement = document.createElement("h1");
totalElement.className = "mt smaller";
totalElement.textContent = totalLitems;
financeCard1.appendChild(totalElement);

// Render Receitas (Revenues)
const financeCard2 = document.getElementById("finance-card-2");
const revenueElement = document.createElement("h1");
revenueElement.className = "mt smaller";
revenueElement.textContent = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(revenues);
financeCard2.appendChild(revenueElement);

// Render Despesas (Expenses)
const financeCard3 = document.getElementById("finance-card-3");
const expensesElement = document.createElement("h1");
expensesElement.className = "mt smaller";
expensesElement.textContent = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(expenses);
financeCard3.appendChild(expensesElement);



// Render balance
const financeCard4 = document.getElementById("finance-card-4");
const balanceTextElement = document.createElement("h1");
balanceTextElement.className = "mt smaller";
balanceTextElement.textContent = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(totalValue);
financeCard4.appendChild(balanceTextElement);


};

const onLoadFinancesData = async () => {
  try {
    const date = " 2020-12-15";
    const email =localStorage.getItem("@WalletApp:userEmail");
    const result = await fetch (
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      { 
        method: "GET",
        headers: {
          email: email,
        },
      }
    );

    const data = await result.json(); 
    renderFinanceElements(data);
    renderFinancesList(data);
    return data;  
  } catch (error) {
    return { error};    
  }
};

const onloadUserInfo = () => {
 const email =localStorage.getItem("@WalletApp:userEmail");
 const name =localStorage.getItem("@WalletApp:userName");

 const navbarUserInfo = document.getElementById("navbar-user-container");
 const navbarUseAvatar = document.getElementById("navbar-user-avatar");


 const emailElement = document.createElement("p");
 const emailText = document.createTextNode (email);
 emailElement.appendChild(emailText);
 navbarUserInfo.appendChild(emailElement);

 const logoutElement = document.createElement ("a");
 const logoutText = document.createTextNode("sair");
 logoutElement.appendChild(logoutText);
 navbarUserInfo.appendChild(logoutElement);


 const nameElement = document.createElement("h3");
 const nameText = document.createTextNode(name.charAt(0));
 nameElement.appendChild(nameText);
 navbarUseAvatar.appendChild(nameElement);
 
};

const onOpenModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};


const onCloseModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

window.onload = () => {
  onloadUserInfo();
  onLoadFinancesData ();


};