let ham = document.querySelector('.hamburger');
let links = document.querySelector('.links');

ham.addEventListener('click', () => {
   if(links.classList.contains('show')){
      links.classList.remove('show');
   }
   else {
      links.classList.add('show');
   }
});
