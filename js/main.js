// Declarações Globais
const viewport = document.querySelector('.app');
const content = viewport.querySelector('.app-inner');

// ScrollBooster - Arrastar tela - página inicial
let sb = new ScrollBooster({
    viewport: viewport,
    emulateScroll: false,
    bounce: false,
    shouldScroll: (data, event) => {
        return event.target.tagName !== 'BUTTON';
    },
    onUpdate: (data) => {
        content.style.transform = `translate(
        ${-data.position.x}px,
        ${-data.position.y}px
      )`
    },
    onClick() {
        console.log('clicked')
    }
});

// Left Sidebar Navigation
const sideNavAnimals = document.querySelector(".sidenav-animals");
const handle = sideNavAnimals.querySelector(".arrow-toggle");
const icon_handle = document.querySelector(".arrow-toggle i");

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

/* Hover Regions SVG */
const inner = document.querySelector('.region_1_svg');

inner.addEventListener('mouseenter', () => inner.classList.add('hovered'));
inner.addEventListener('mouseleave', () => inner.classList.remove('hovered'));