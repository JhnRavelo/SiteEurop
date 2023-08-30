const logoutBtn = document.querySelector('.logout')
const sessionFetch = async(url) => {
    const response = await fetch(`/${url}`)
           .then(response => {
               // Vérifiez si la requête s'est bien déroulée (statut 200)
               if (!response.ok) {
                 alert('La requête a échoué !');
               }
               // Transformez la réponse en JSON et renvoyez-la
               return response.json();
           })
           .then(data => {
             return data
           })
       console.log(response);
       if(response){
         return response
       } 
   }
var timeout = false;
function checkActivity() {
    clearTimeout(timeout);
    timeout = setTimeout(function () { 
        sessionFetch('auth/logout')
        window.location.href = '/'
    }, 2*60*1000);
}
document.addEventListener('keydown', checkActivity);
document.addEventListener('mousedown', checkActivity);
document.addEventListener('mousemove', checkActivity);
document.addEventListener('click', checkActivity);
document.addEventListener('touchmove', checkActivity);
checkActivity();
logoutBtn.addEventListener('click',()=>{
  sessionFetch('auth/logout')
  window.location.href = '/'
})