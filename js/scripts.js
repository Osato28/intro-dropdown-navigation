function toggle(element) {
    const toggledClass = element.dataset.classToggled ?? null;

    (toggledClass && element?.classList.contains(toggledClass))
    ? element.classList.remove(toggledClass)
    : element.classList.add(toggledClass);
}

function untoggleAllChildren(element) {
    // using querySelectorAll because it returns a static collection;
    // elementsByClassName return a live one that drops  as classes are removed.
    const toggledChildren = element.querySelectorAll(".toggled");
    // 
    for (var el of toggledChildren) {
        el?.classList.remove("toggled");
    }
}

const toggleElements = document.getElementsByClassName('toggle');

// Variable that checks whether the 
var isMobile = matchMedia('(max-width: 767px)').matches;
// The check runs every resize (turning the tablet from portrait to landscape, for instance)
window.addEventListener('resize', (ev) => {
    newValue = matchMedia('(max-width: 767px)').matches;
    if (isMobile !== newValue) {
        console.log(isMobile, newValue, "untoggling")
        isMobile = newValue;

        // Untoggle all toggled elements if isMobile changes
        untoggleAllChildren(document);
    }
});

function clickToggle(ev) {
    if (isMobile) {
        let targetFound = false;
        for (el of toggleElements) {
            // Check if the onClick's target is an immediate child of any elements that have .toggle class
            if (el.firstElementChild === ev.target) {
                toggle(el);
            }
            if (el.contains(ev.target)) {
                targetFound = true;
            }
        }
    
        if (!targetFound) {
            untoggleAllChildren(document);
        }
    }
}

document.addEventListener("click", clickToggle)
