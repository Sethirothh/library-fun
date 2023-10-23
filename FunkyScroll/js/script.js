// Tilføjer en hændelseslytter for museklik på hele dokumentet
// og forhindrer standardadfærd for midterste museknap (knapværdi 1).
document.addEventListener('mousedown', (event) => {
    if (event.button === 1) { // Check if the middle mouse button is clicked (button value 1)
        event.preventDefault(); // Prevent the default behavior
    }
});

// En IIFE (Immediately Invoked Function Expression), der kører umiddelbart.
(function(){
    init(); // Initialiserer starten.

        // Deklarerer en variabel til senere brug.
    var g_containerInViewport;
    function init(){
        setStickyContainersSize(); // Justerer højden på "sticky-container" elementer.
        bindEvents(); // Tilføjer en hændelseslytter for musehjulet.
    }

    function bindEvents(){
        window.addEventListener("wheel", wheelHandler); // Lytter til musehjulet.
    }

    // Justerer højden på "sticky-container" elementer baseret på indholdet.
    function setStickyContainersSize(){
        document.querySelectorAll('.sticky-container').forEach(function(container){
            const stikyContainerHeight = container.querySelector('main').scrollWidth;
            container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
        });
    }

    
    // Tjekker om et element er synligt i browserens vindue.
    function isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }

    // Håndterer musehjulets rulning.
    function wheelHandler(evt){
        // Filtrer "sticky-container" elementerne for at finde det første synlige element.
        const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container){
            return isElementInViewport(container);
        })[0];

        if(!containerInViewPort){
            return; // Afslutter funktionen, hvis ingen elementer er synlige.
        }

        // Tjekker om elementet kan rulle horisontalt og justerer "main" elementets scrollLeft.
        var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
        var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
        let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

        if(g_canScrollHorizontally){
            containerInViewPort.querySelector('main').scrollLeft += evt.deltaY;
        }
    }
})();