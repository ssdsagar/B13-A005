



document.getElementById("login-btn").addEventListener("click", function(){
    const nameInput = document.getElementById("input-name")
    const name = nameInput.value
  const passwordInput = document.getElementById("input-password")
  const password = passwordInput.value
if(name == "admin" && password == "admin123"){
    alert("login successful")
    window.location.assign("main.html")
}
else{
 alert("login failed")
 return
}
} )



