 document.addEventListener("DOMContentLoaded", start);

 function start() {
     let filter = "alle";
     let sFilter = "";
     let retter = [];


     document.querySelectorAll(".filter").forEach(elm => {
         elm.addEventListener("click", filtreing);
     });


     function filtreing() {
         filter = this.getAttribute("data-ret");
         document.querySelector("h1").textContent = this.textContent;
         document.querySelectorAll(".filter").forEach(elm => {
             elm.classList.remove("valgt");
         });
         this.classList.add("valgt");
         console.log(filter);
         visRetter();
     }

     function singleViewFilter() {
         sFilter = this.getAttribute("data-retter");
         console.log("Virk", this, sFilter);
         visRet();



     }

     function visRet() {
         document.querySelector(".single").innerHTML = "";
         retter.forEach(retter => {
             if (sFilter == retter.id) {
                 document.querySelector(".single").classList.remove("hide");
                 document.querySelector(".overlay").classList.remove("hide");


                 document.querySelector(".single").innerHTML +=

                     `<div class="vis2" data-retter="${retter.id}">

<img src="imgs/large/${retter.billede}.jpg" alt="${retter.navn}">

<div class="tekst">
 <h2>${retter.navn}</h2>
<p>${retter.lang}</p>
<p><b>Pris:</b> ${retter.pris},-</p>

</div>  
</div>`
             }

         });
         document.querySelectorAll(".vis").forEach(elms => {
             elms.addEventListener("click", singleViewFilter);
         });

         document.querySelector(".overlay").addEventListener("click", fjernsingle);
         document.querySelector(".single").addEventListener("click", fjernsingle);


     }

     function fjernsingle() {
         document.querySelector(".single").classList.add("hide");
         document.querySelector(".overlay").classList.add("hide");
     }

     async function getJson() {
         let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1jxxxFoWBuMJ1qhQ9BQIAyKHmP38XtAF9_sQr0xo5JLo");
         retter = await jsonData.json();
         visRetter();
     }





     function visRetter() {
         document.querySelector("#retter").innerHTML = "";
         retter.forEach(retter => {
             if (filter == "alle" || filter == retter.kategori) {
                 document.querySelector("#retter").innerHTML +=

                     `<div class="vis" data-retter="${retter.id}">

<img src="imgs/large/${retter.billede}.jpg" alt="${retter.navn}">

<div class="tekst2">
 <h2>${retter.navn}</h2>
<p>${retter.kort}</p>
<p><b>Pris:</b> ${retter.pris},-</p>

</div>  
</div>`
             }


         });

         document.querySelectorAll(".vis").forEach(elms => {
             elms.addEventListener("click", singleViewFilter);
         });



     }

     getJson();



 }
