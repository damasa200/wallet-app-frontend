const onCallRegister = async (email,name) => {
  try {
    const data = {
      email,
      name,
   };

    const response = await fetch(
     "https://mp-wallwt-app-api.herokuapp.com/users", 
    
     {      
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "content-Type": "application/json",   
       },

        boby: JSON.stringify(data),     
     }
    );  
  
    const user = await response.json();
    return user;
  } catch (error) {
    return {error};
  }  
};
  







const onRegister = async () => {
  const email = document.getElementById("input-email").value;
  const name = document.getElementById("input-name").value;

  if (name.length < 3) {
    alert("Nome deve conter mais de 3 caracter.");
    return;
  }


  if (email.length < 5 || !email.includes("@")){
    alert("Email invàlido");
    return;
  }

  const result = await onCallRegister (email,name)

  if (result.error){
    alert("Falha ao Validar e-mail.");
    return;
  }

  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("../home/index.html", "_self");
  
};

window.onload = () => {
  const form = document.getElementById("form-register");
  form.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  };

}; 

