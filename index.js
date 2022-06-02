let ham = document.getElementById('ham');
ham.addEventListener("click", function(){
    let obj = document.getElementById('link');
    if(obj.style.display === 'none'){
       obj.style.display = 'flex';
    }
    else{
        obj.style.display = 'none';
     }
});