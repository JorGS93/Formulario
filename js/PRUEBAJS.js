
var formElement=null;
var numeroSecreto=null;
var numeroSecreto1=null;
var respuestaSelect0=null;
var respuestaSelect1=null;
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var respuestasCheckbox3 = [];
var respuestasCheckbox4 = [];
var respuestaRadio=null;
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   corregirNumber();
   corregirNumber1();
   corregirSelect0();
   corregirSelect1();
   corregirCheckbox();
   corregirCheckbox1();
   corregirRadio();
   corregirRadio2();
   presentarNota();   
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/JorGS93/Formulario/master/xml/Preguntas.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //NUMBER quiero que sea text
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[2].innerHTML;
 ponerDatosInputHtml(tituloInput);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[2].innerHTML);
// text1
  var tituloInput1=xmlDoc.getElementsByTagName("title")[3].innerHTML;
 ponerDatosInputHtml1(tituloInput1);
 numeroSecreto1=parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jbo009").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) {
    opcionesSelect[i] = xmlDoc.getElementById("jbo009").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect0=xmlDoc.getElementById("jbo009").getElementsByTagName("answer")[0].innerHTML;

// SELECT1
  var tituloSelect1=xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jbo010").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) {
    opcionesSelect[i] = xmlDoc.getElementById("jbo010").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml1(tituloSelect1,opcionesSelect);
 respuestaSelect1=xmlDoc.getElementById("jbo010").getElementsByTagName("answer")[0].innerHTML;

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox0 = xmlDoc.getElementsByTagName("title")[0].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById('jbo001').getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById('jbo001').getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox0,opcionesCheckbox);
 var nres = xmlDoc.getElementById('jbo001').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById('jbo001').getElementsByTagName("answer")[i].innerHTML;
 }
//CHECKBOX1
  var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById('jbo002').getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById('jbo002').getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox1,opcionesCheckbox);
 var nres = xmlDoc.getElementById('jbo002').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById('jbo002').getElementsByTagName("answer")[i].innerHTML;
 }
//SELECT multiple
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jbo005").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("jbo005").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectMultipleHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
 //SELECT multiple1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[5].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jbo006").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("jbo006").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectMultiple1Html(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);


 //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById('jbo007').getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById('jbo007').getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadioHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById('jbo007').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox3[i]=xmlDoc.getElementById('jbo007').getElementsByTagName("answer")[i].innerHTML;
 }
  //RADIO1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById('jbo008').getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById('jbo008').getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadio1Html(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById('jbo008').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox4[i]=xmlDoc.getElementById('jbo008').getElementsByTagName("answer")[i].innerHTML;
 }

}

//****************************************************************************************************
//implementación de la corrección

function corregirNumber(){
  var s=formElement.elements[0].value;     
  if (s==numeroSecreto) {
   darRespuestaHtml("Pregunta 1: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto) darRespuestaHtml("Pregunta 1: Te has pasado");
    else darRespuestaHtml("Pregunta 1: Te has quedado corto");
  }
}

function corregirNumber1(){
  var s=formElement.elements[1].value;     
  if (s==numeroSecreto1) {
   darRespuestaHtml("Pregunta 2: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto1) darRespuestaHtml("Pregunta 2: Te has pasado");
    else darRespuestaHtml("Pregunta 2: Te has quedado corto");
  }
}

function corregirSelect0(){
  var sel = formElement.elements[2];  
  if (sel.selectedIndex==respuestaSelect0) {
   darRespuestaHtml("Pregunta 3: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 3: Incorrecto");
}

function corregirSelect1(){
  var sel = formElement.elements[3];  
  if (sel.selectedIndex==respuestaSelect1) {
   darRespuestaHtml("Pregunta 4 : Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 4: Incorrecto");
}


function corregirCheckbox(){
  var contador=0;
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.jor.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.jor[i].checked){
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.jor.length; i++) {   
   if (f.jor[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     contador++;
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
    }   
   }
  }
  if(contador==2){
    darRespuestaHtml("Pregunta 5: correcta");    
  }else{
    darRespuestaHtml("Pregunta 5: incorrecta");  
  }
}


function corregirCheckbox1(){
  var cont=0;
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.FLOR.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.FLOR[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.FLOR.length; i++) {   
   if (f.FLOR[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas      
     cont++;
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
    }   
   }
  }
    if(cont==2){
    darRespuestaHtml("Pregunta 6: correcta");    
  }else{
    darRespuestaHtml("Pregunta 6: incorrecta");  
  }
}




function corregirRadio(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox3.length; j++) {
     if (i==respuestasCheckbox3[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.color.length; i++) {   
   if (f.color[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox3.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 7: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox3.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 7: "+i+" incorrecta");
    }   
   }
  }
}


function corregirRadio2(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.POKEMON.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.POKEMON[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox4.length; j++) {
     if (i==respuestasCheckbox4[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.POKEMON.length; i++) {   
   if (f.POKEMON[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox4.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 8: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox4.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 8: "+i+" incorrecta");
    }   
   }
  }
}


//****************************************************************************************************
// poner los datos recibidos en el HTML
//text
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}
//text1
function ponerDatosInputHtml1(t){
 document.getElementById("tituloInput1").innerHTML = t;
}

//selectMultiple
function ponerDatosSelectMultipleHtml(t,opt){
  document.getElementById("tituloSelectMultiple").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];// opciones
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
//selecctmultiple1
function ponerDatosSelectMultiple1Html(t,opt){
  document.getElementById("tituloSelectMultiple1").innerHTML=t;
  var select = document.getElementsByTagName("select")[3];// opciones
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
//select
function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];// opciones
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
//select
function ponerDatosSelectHtml1(t,opt){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];// opciones y posibilidades
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
//checkbox
function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "jor_"+i);
    input.type="checkbox";
    input.name="jor";
    input.id="jor_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}
//checkbox1
function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "FLOR_"+i);
    input.type="checkbox";
    input.name="FLOR";
    input.id="FLOR_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}
//radio
function ponerDatosRadioHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv2');
 document.getElementById('tituloRadio').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="radio";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//radio1
function ponerDatosRadio1Html(t,opt){
 var checkboxContainer3=document.getElementById('checkboxDiv3');
 document.getElementById('tituloRadio1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "POKEMON_"+i);
    input.type="radio";
    input.name="POKEMON";
    input.id="POKEMON_"+i;;    
    checkboxContainer3.appendChild(input);
    checkboxContainer3.appendChild(label);
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}