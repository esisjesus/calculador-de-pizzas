$(document).ready(function(){
    let name = $("#name").val() || "Pizza Lover"
    let input = $("#inputName");
    let back = $("#backButton")
    let begin = $("#comenzar");
    let masas = $("#masas");
    let salsas = $("#salsas");
    let ingredientes = $("#ingredientes");
    let ingJson = [];
    let masasJson = [];
    let salsasJson = [];
    let seleccionados = [450];
    var scrollPosition;
    
    $('html,body').scrollTop(0);
    
    begin.on("click", searchIngredients);
    $(".scrollerButton").on("click", (e) => {
       let toScroll = scrollButtons(scrollPosition);
       toScroll();
    })
    back.on("click", backToTop)

    
    // Funciones del scroll
    function scrollButtons(e){
        if(e == "inputName"){
            secScroll = () => {
                scrollSmooth("masas")
            }
            return secScroll
        }else if(e == "masas"){
            thirdScroll = () =>{
                scrollSmooth("salsas")
            }
            return thirdScroll
        }else if(e == "salsas"){
            fourthScroll = () =>{
                scrollSmooth("ingredientes");
            }
            return fourthScroll
        }
    }
    function scrollSmooth(parameter){
        zenscroll.center(document.getElementById(parameter));
        scrollPosition = parameter;
    }
    function backToTop(){
        zenscroll.toY(50);
    }
    
    
    // Funciones de calculadora
    function searchIngredients(){
        let origin = `/ingredientes.json`;
        
        // fetch(origin).then((res)=>{ return res.json()}).then((res)=>{
        //     console.log(res);
        // })
        $.get(origin).then(htmlIngredients);
    }
    function htmlIngredients(res){
        let ingOpt = '';
        let masasOpt = '';
        let salsasOpt = '';
        ingJson = res.ingredientes
        masasJson = res.masas;
        salsasJson = res.salsas;
        for(i = 0 ; i < res.ingredientes.length ; i ++ ){
            const element = res.ingredientes[i];
            ingOpt += `<input type="checkbox" name="ingredientes${i}" data-index="${i}"  id="${element.name}" class="ingrediente">
            <label  class="label" for="ingredientes${i}">${element.name}</label>`;
        }
        for(i = 0 ; i < res.masas.length ; i ++ ){
            const element = res.masas[i];
            masasOpt += `<input type="checkbox" name="masas${i}" data-index="${i}"  id="${element.name}" class="masa">
            <label class="label" for="masas${i}">${element.name}</label>`;
        }
        for(i = 0 ; i< res.salsas.length ; i ++ ){
            const element = res.salsas[i];
            salsasOpt += `<input type="checkbox" name="salsas${i}" data-index="${i}" "id="${element.name}" class="salsa"">
            <label class="label" for="salsas${i}">${element.name}</label>`;
        }
        ingredientes.html(ingOpt);
        masas.html(masasOpt);
        salsas.html(salsasOpt);
        
        scrollSmooth("inputName");
        scrollButtons(scrollPosition);
        $("#submit").click(calcularPrecio);

        
    }
    
    function checkCheck(){
       
        let masaCheck = $(".masa"); 
        for(i = 0 ; i < masaCheck.length ; i++){
            if(masaCheck[i].checked){
                let checkedIndex = $(masaCheck[i]).data().index;
                seleccionados.push(masasJson[checkedIndex].value);
            }
        }
        let salsaCheck = $(".salsa"); 
        for(i = 0 ; i < salsaCheck.length ; i++){
            if(salsaCheck[i].checked){
                let checkedIndex = $(salsaCheck[i]).data().index;
                seleccionados.push(salsasJson[checkedIndex].value);
            }
        }
        let ingCheck = $(".ingrediente"); 
        for(i = 0 ; i < ingCheck.length ; i++){
            if(ingCheck[i].checked){
                let checkedIndex = $(ingCheck[i]).data().index;
                seleccionados.push(ingJson[checkedIndex].value);
            }
        }
        
        let precioTotal = seleccionados.reduce((a,b)=> a + b);
        let name = $("#inputName").val() || "Pizza Lover"
        Swal.fire({
            title: 'Quieres hacer un ultimo cambio?',
            text: "Es tu ultima oportunidad de agregar un ultimo topping!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'rgb(43, 114, 73)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Dame mi pizza ahora!',
            cancelButtonText: 'Quiero hacer un cambio',
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                `Felicidades ${name}!`,
                `El horno esta esperando por tu pizza ahora! Total a pagar $${precioTotal}`,
                'success',
                setTimeout(window.location.reload.bind(window.location), 5000)
                )
              
            }
          })
    }
    function calcularPrecio(){
        checkCheck();

    }


    
})