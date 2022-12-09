/*  Declarações Gerais  */
// ScrollBooster
const viewport = document.querySelector('.app');
const content  = viewport.querySelector('.app-inner');

const viewport2 = document.querySelector('.app-2');
const content2  = viewport2.querySelector('.app-inner-2');

// Navegação lateral esquerda
const sideNavAnimals = document.querySelector(".sidenav-animals");
const handle         = sideNavAnimals.querySelector(".arrow-toggle");
const icon_handle    = document.querySelector(".arrow-toggle i");

// Regiões
const canvasRegion1 = document.getElementById('region_1');
const canvasRegion2 = document.getElementById('region_2');
const canvasRegion3 = document.getElementById('region_3');
const canvasRegion4 = document.getElementById('region_4');

const contextRegion1 = canvasRegion1.getContext("2d", {willReadFrequently: true});
const contextRegion2 = canvasRegion2.getContext("2d", {willReadFrequently: true});
const contextRegion3 = canvasRegion3.getContext("2d", {willReadFrequently: true});
const contextRegion4 = canvasRegion4.getContext("2d", {willReadFrequently: true});

const imageRegionUrls = [
  'https://i.imgur.com/ySd7f61.png',
  'https://i.imgur.com/NIBRAac.png',
  'https://i.imgur.com/y6zVYPY.png',
  'https://i.imgur.com/8W37VUG.png'
];

// Variáveis de controle de eventos
var mouseMoved          = false;
var animal1Completed    = false;
var progressBarValue    = 0;
var progressBarqntValue = 10;

/* Inicializações */
$("#cenario-region-4").hide();
$("#menu").hide();
$(".card-1").hide();

/*  ScrollBooster - Arrastar tela  */
let sb = new ScrollBooster({
    viewport: viewport,
    emulateScroll: false,
    bounce: false,
    onUpdate: (data) => {
        content.style.transform = `translate(
        ${-data.position.x}px,
        ${-data.position.y}px
      )`
    }
});

let sb2 = new ScrollBooster({
  viewport: viewport2,
  emulateScroll: false,
  bounce: false,
  onUpdate: (data) => {
      content2.style.transform = `translate(
      ${-data.position.x}px,
      ${-data.position.y}px
    )`
  }
});

/*  Navegação lateral esquerda - menu dos animais  */
handle.onclick = function () {
  sideNavAnimals.classList.toggle("active");
  icon_handle.classList.toggle("icon_rotate");
};

$(".arrow-up").click(function () {
  $(".navigation ul").animate({
    scrollTop: "-=65px"
  });
});

$(".arrow-down").click(function () {
  $(".navigation ul").animate({
    scrollTop: "+=65px"
  });
});

/*  Regiões - flutuação, ações e interação  */
// Carrega todas as imagens das regiões
const loadImage = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.addEventListener('load', () => resolve(img));
  img.addEventListener('error', (err) => reject(err));
  img.src = url;
  img.crossOrigin="anonymous";
});

// Desenha as imagens no canvas após carregar todas as imagens
Promise
  .all(imageRegionUrls.map(loadImage))
  .then(([region1, region2, region3, region4]) => {
    contextRegion1.drawImage(region1, 0, 0);
    contextRegion2.drawImage(region2, 0, 0);
    contextRegion3.drawImage(region3, 0, 0);
    contextRegion4.drawImage(region4, 0, 0);
  });

// Retorna se a posição do mouse está em fundo transparente(valor = 0) ou na imagem(0 > valor <= 255)
function getAlphaData(e, obj){
  var dragScreen = $('.app-inner');
  var transformMatrix = dragScreen.css("-webkit-transform") ||
                        dragScreen.css("-moz-transform")    ||
                        dragScreen.css("-ms-transform")     ||
                        dragScreen.css("-o-transform")      ||
                        dragScreen.css("transform");
  var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
  var xMatriz = matrix[12] || matrix[4];
  var yMatriz = matrix[13] || matrix[5];

  xMatriz = Math.abs(xMatriz);
  yMatriz = Math.abs(yMatriz);

  var pos = findPos(obj);
  var x = ( e.pageX + xMatriz ) - pos.x;
  var y = ( e.pageY + yMatriz ) - pos.y;
  var canvas = obj.getContext("2d", {willReadFrequently: true});
  var pixel = canvas.getImageData(x, y, 1, 1).data;

  return pixel[3];
}

// Retorna em pixels as posições x,y do mouse
function findPos(obj) {
  var curleft = 0, curtop = 0;
  if (obj.offsetParent) {
      do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return { x: curleft, y: curtop };
  }
  return undefined;
}

function mouseMoveCheck(e){
  mouseMoved = true;
}

// Interação mouse - Região 1
$("#region_1").on({

  // Aplica animação na região quando mouse passa por cima
  mousemove: function(e){
    if(getAlphaData(e, this) != 0){
      $(this).addClass('hovered');
    }
    else {
      $(this).removeClass('hovered');
    }
  },

  // Abre tela da região e diferencia um click de um click + arrastar da região
  mouseup: function(e){
    if(getAlphaData(e, this) != 0){
      if(!mouseMoved){
        // alert("Apenas um click");
      }else{
        // alert("Click com tela arrastada");
      }
    }
    $("#region_1").off('mousemove', mouseMoveCheck);
    mouseMoved = false;
  },
  mousedown: function(e){
    $("#region_1").on('mousemove', mouseMoveCheck);
  }
});


// Interação mouse - Região 2
$("#region_2").on({

  // Aplica animação na região quando mouse passa por cima
  mousemove: function(e){
    if(getAlphaData(e, this) != 0){
      $(this).addClass('hovered');
    }
    else {
      $(this).removeClass('hovered');
    }
  },

  // Abre tela da região e diferencia um click de um click + arrastar da região
  mouseup: function(e){
    if(getAlphaData(e, this) != 0){
      if(!mouseMoved){
        // alert("Apenas um click");
      }else{
        // alert("Click com tela arrastada");
      }
    }
    $("#region_2").off('mousemove', mouseMoveCheck);
    mouseMoved = false;
  },
  mousedown: function(e){
    $("#region_2").on('mousemove', mouseMoveCheck);
  }
});

// Interação mouse - Região 3
$("#region_3").on({

  // Aplica animação na região quando mouse passa por cima
  mousemove: function(e){
    if(getAlphaData(e, this) != 0){
      $(this).addClass('hovered');
    }
    else {
      $(this).removeClass('hovered');
    }
  },

  // Abre tela da região e diferencia um click de um click + arrastar da região
  mouseup: function(e){
    if(getAlphaData(e, this) != 0){
      if(!mouseMoved){
        // alert("Apenas um click");
      }else{
        // alert("Click com tela arrastada");
      }
    }
    $("#region_3").off('mousemove', mouseMoveCheck);
    mouseMoved = false;
  },
  mousedown: function(e){
    $("#region_3").on('mousemove', mouseMoveCheck);
  }
});

// Interação mouse - Região 4
$("#region_4").on({

  // Aplica animação na região quando mouse passa por cima
  mousemove: function(e){
    if(getAlphaData(e, this) != 0){
      $(this).addClass('hovered');
    }
    else {
      $(this).removeClass('hovered');
    }
  },

  // Abre tela da região e diferencia um click de um click + arrastar da região
  mouseup: function(e){
    // Aciona apenas quando for um click
    if(getAlphaData(e, this) != 0){
      if(!mouseMoved){
        $("#cenario-region-4").fadeIn();
        sb2.updateMetrics();
      }
    }
    $("#region_4").off('mousemove', mouseMoveCheck);
    mouseMoved = false;
  },
  mousedown: function(e){
    $("#region_4").on('mousemove', mouseMoveCheck);
  }
});

/* Menu de cards */
$("#close-menucard").click(function(){
  $("#menu").fadeToggle();
})
$("#menu-post-cards").click(function(){
  $("#menu").fadeToggle();
});

/* Card de ajuda */
$("#close-helpcard").click(function(){
  $(".help-card").fadeToggle();
});

$("#btn-help-card").click(function(){
  $(".help-card").fadeToggle();
})

/* Visualiza card - Animal 1*/
$("#menu-image-animal-1").click(function(){
  if(animal1Completed){
    $(".card-1").fadeToggle();
  }
});

$("#close-card1").click(function(){
    $(".card-1").fadeOut();
});

$("#drop-animal-1").click(function(){
  if(animal1Completed){
    $(".card-1").fadeToggle();
  }
});

/* Eventos ligados à região 4 */
$("#close-cenario-4").click(function(){
  $("#cenario-region-4").fadeOut();
});

$("#drop-animal-1").draggable({ 
  helper: 'clone',
  revert: 'invalid',
  scroll: false,
  appendTo: 'body' 
});

$('#animal-region-4-1').droppable({ 
  accept: '#drop-animal-1',
  drop: function(event, ui) {
    animal1Completed = true;
    progressBarValue += progressBarqntValue;

    //Adiciona animal no cenário
    $(this).addClass('completed');
    
    //Altera ícone escuro para a ilustração ícone do animal
    $("#drop-animal-1").addClass('peixe-boi-icon-activated');
    $("#drop-animal-1").removeClass('peixe-boi-icon-deactivated');

    //Adiciona a porcentagem da barra de progresso
    $("#progress-bar").width(progressBarqntValue + "%");
    $("#progress-bar").text(progressBarValue + " %");

    //Remove filtro de escala cinza da imagem do animal
    $("#menu-image-animal-1").removeClass("image-animal-deactivated");

    //Exibe card do animal
    $(".card-1").fadeIn();
    
    //Desabilita o Drag-and-Drog do animal
    ui.draggable.draggable({disabled: true});
}});