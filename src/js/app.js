
document.addEventListener('DOMContentLoaded', function() {

    fixedNavigation()
    generateGallery()
    highlightLink()
    scrollNav()
});

function fixedNavigation(){
    const header = document.querySelector('.header')
    const aboutFestival = document.querySelector('.about-festival')
    
    window.addEventListener('scroll', function(){
        //le paso una seccion del html y cuando la pasa ancla la barra de navegacion
        if(aboutFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed')
        }else{
            header.classList.remove('fixed')
        }
    })
}

function generateGallery(){

    const QUANTITY_IMG = 16;
    const gallery = document.querySelector('.gallery-images')
    // for crea 1 elemento imagen por cada vuelta que da segun el url que obtenga
    for(let i=1; i<=QUANTITY_IMG; i++){
        const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
    <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
    `;
        
        imagen.onclick = function() {
            showImage(i);
        }
        gallery.appendChild(imagen)
    }
}

function showImage(i){

    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;

    //agregar modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = closeModal
    
    //boton cerrar
    const btnClose = document.createElement('BUTTON')
    btnClose.textContent = 'X'
    btnClose.classList.add('btn-close')
    btnClose.onclick = closeModal

    modal.appendChild(imagen)
    modal.appendChild(btnClose)

    //agregar al html
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)

}

function closeModal(){
    const modal = document.querySelector('.modal')
    const body = document.querySelector('body')
    modal.classList.add('fade-out')

    setTimeout(() =>{
       modal?.remove() 
       body.classList.remove('overflow-hidden')
    }, 500)
}

function highlightLink(){
    document.addEventListener('scroll', () =>{
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.main-navigation a')
        let now = '';
        sections.forEach(section =>{
            //for para saber cual es la seccion mas visible en el navegador

            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3)){
                now = section.id;
            }
        navLinks.forEach(link => {
            // elminio la clase y despues la agrego al que este visible 'active'

            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + now){
                link.classList.add('active');
            }
        })
        })
    })
}

function scrollNav(){
    const navLinks = document.querySelectorAll('.main-navigation a')
    navLinks.forEach( link => {
        link.addEventListener('click',e =>{
            //prevengo que me lleve directo al link
            e.preventDefault();
            //obtengo la seccion clickeada y hago la transicion de scroll
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)
            //efecto de scroll
            section.scrollIntoView({behavior: 'smooth'})
        })
    })

}