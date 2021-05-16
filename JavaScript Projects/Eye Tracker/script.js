window.saveDataAcrossSessions = true

let leftCutoff = window.innerWidth / 3;
let rightCutoff = window.innerWidth - window.innerWidth / 3;
const LOOK_DELAY = 1000;
window.addEventListener("resize", () => {
    leftCutoff = window.innerWidth / 3;
    rightCutoff = window.innerWidth - window.innerWidth / 3;
    console.log(leftCutoff)
    console.log(rightCutoff)
})

console.log(leftCutoff)
console.log(rightCutoff)
let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null
let imageElement = getNewImage()
let nextImageElement = getNewImage(true)

webgazer.setGazeListener((data, timestamp) => {
    if (data == null) {
        return
    }

    if (data.x < leftCutoff &&
        lookDirection !== "left" &&
        lookDirection !== "Reset") {
        startLookTime = timestamp
        lookDirection = "left"
    } else if (
      data.x > rightCutoff &&
      lookDirection !== "right" &&
      lookDirection !== "Reset"
    ) {
      startLookTime = timestamp;
      lookDirection = "right";
    } else if (data.x >= leftCutoff && data.x <= rightCutoff) {
        startLookTime = Number.POSITIVE_INFINITY
        lookDirection = null
    }

    if (timestamp > startLookTime + LOOK_DELAY) {
        if (lookDirection === "left") {
            imageElement.classList.add("left")
        } else if (lookDirection === "right") {
            imageElement.classList.add("right")
        }

        startLookTime = Number.POSITIVE_INFINITY;

        setTimeout(() => {
            imageElement.remove()
            nextImageElement.classList.remove("next");
            imageElement = nextImageElement;
            nextImageElement = getNewImage(true);
            lookDirection = "Reset";
        }, 200)
    }
}).begin()

webgazer.showVideoPreview(false)

function getNewImage(next = false) {
    const img = document.createElement("img")
    img.src = "https://picsum.photos/1000?" + Math.random()
    if (next) {
        img.classList.add("next")
    }
    document.body.append(img)
    return img
}