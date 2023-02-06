//Dashboard links
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click',()=>{
        let link = tab.attributes['data-link'].value;
        window.location.assign(link)
    })
});

//Select DOM items
const menuBtn=document.querySelector('.menu-btn');
const menu=document.querySelector('.menu');
const menuNav=document.querySelector('.menu-nav');
const navItmes=document.querySelectorAll('.nav-item');

//Set initial state of menu
let showMenu=false;

menuBtn.addEventListener('click',toggleMenu)

function toggleMenu(){
    if(!showMenu){
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        navItmes.forEach(item=>item.classList.add('show'));
        menuBtn.classList.add('active');
        //Set Menu state
        showMenu=true;
    }else{
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        navItmes.forEach(item=>item.classList.remove('show'));
        menuBtn.classList.remove('active');
        //Set Menu state
        showMenu=false;
    }
}