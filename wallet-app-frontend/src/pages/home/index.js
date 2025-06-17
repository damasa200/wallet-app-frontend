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

window.onload = () => {
  onloadUserInfo();


};