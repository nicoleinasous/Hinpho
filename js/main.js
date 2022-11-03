const viewport = document.querySelector('.app');
const content = viewport.querySelector('.app-inner');

let sb = new ScrollBooster({
    viewport: viewport,
    // content: content,
    // textSelection: true,
    emulateScroll: false,
    bounce: false,
    shouldScroll: (data, event) => {
        return event.target.tagName !== 'BUTTON';
    },
    onUpdate: (data) => {
        // viewport.scrollLeft = data.position.x
        // viewport.scrollTop = data.position.y
        content.style.transform = `translate(
        ${-data.position.x}px,
        ${-data.position.y}px
      )`
    },
    onClick() {
        console.log('clicked')
    }
})