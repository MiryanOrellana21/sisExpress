$(document).ready(function(){
    AgregarMenus();
    AgregarFooter();
});
function AgregarMenus(){
    var menu =document.getElementById("Menu");
    menu.innerHTML='<header>'+
    '<div id="topbar">'+
       '<div class="line">'+
          '<div class="s-12 m-6 l-6">'+
             '<p>CONTACTO: <strong>(01)514 5555</strong> | <strong>sis@sis.gob.pe</strong></p>'+
          '</div>'+
          '<div class="s-12 m-6 l-6">'+
             '<div class="social right">'+
                '<a><i class="icon-facebook_circle"></i></a> <a><i class="icon-twitter_circle"></i></a> <a><i class="icon-google_plus_circle"></i></a> <a><i class="icon-instagram_circle"></i></a>'+
             '</div>'+
          '</div>'+
       '</div>'+
    '</div>'+
    '<nav>'+
       '<div class="line">'+
          '<div class="s-6 l-1">'+
             '<p class="logo"><strong>SIS</strong> </p>'+
          '</div>'+
          '<div class="s-6 l-1">'+
            '<img id="photo" class="photo" alt="" >'+
          '</div>'+
          '<div class="top-nav s-12 l-10">'+
             '<p class="nav-text">Menú SIS</p>'+
             '<ul class="right">'+
                '<li><a href="Index.html">Inicio</a></li>'+
                '<li><a href="SobreNosotros.html">Sobre Nosotros</a></li>'+
                '<li><a href="Servicios.html">Servicios</a></li>'+
                '<li><a href="Contactanos.html">Contactanos</a></li>'+
                '<li><a id="aIngresar" href="Login.html" style="background-color:darkturquoise;">Ingresar</a></li>'+
                '<li><a id="aCerrarSesion" href="javascript:CerrarSesion()" style="background-color:brown;">Cerrar Sesión</a></li>'+
               '</ul>'+
          '</div>'+
       '</div>'+
    '</nav>'+
 '</header>'
}
function AgregarFooter(){
 var footer=document.getElementById("Footer");
 footer.innerHTML='<footer>'+
 '<div class="line">'+
    '<div class="s-12 l-6">'+
       '<p>Copyright 2020, SIS - SEGURO INTEGRAL DE SALUD</p>'+
       '<p>DISEÑADO PARA PRACTICAS DE CURSO</p>'+
    '</div>'+
    '<div class="s-12 l-6">'+
       '<a class="right" href="# title="Referencias">Design and coding<br> by Responsee Team</a>'+
    '</div>'+
 '</div>'+
'</footer>'   
}