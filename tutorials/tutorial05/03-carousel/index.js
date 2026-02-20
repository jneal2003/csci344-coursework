// current spot in the carousel
let currentPosition = 0;
// gap inbetween the pictures
let gap = 10;
// width of the 2 photos
const slideWidth = 400;

function moveCarousel(direction) {

    // target elements with clasl "carousel-item"
    const items = document.querySelectorAll(".carousel-item");

    // check if the parameter is forward
    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        // check if were on the last page of photos
        if (currentPosition >= items.length - 2) {
            // if so don't let us keep going
            return false;
        }
        // if not last page, iterate to the next spot in carousel
        currentPosition++;
    } else {
        // the parameter is back, check if were on the first page, preventing going backwards
        if (currentPosition == 0) {
            return false;
        }
        // if not first page, go back in the carousel
        currentPosition--;
    }

    // figure out which location were at and how far to go in that direction
    const offset = (slideWidth + gap) * currentPosition;

    // move the images along to show the next "page" based on the offset
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
