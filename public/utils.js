let imgLabel, divLabel,
execute = true

const imgAnimate = (index, opacity, pointerEvents, delay) => {
    imgLabel = [...document.querySelectorAll('.imgi')]
    divLabel = [...document.querySelectorAll('.divi')]
    gsap.to(imgLabel[index], {
        opacity,
        duration: 1,
        delay,
    })
    gsap.to(divLabel[index], {
        opacity,
        duration: 1,
        pointerEvents,
        delay,
    })
    return divLabel
}

const imgAnimation = (min, max, polar, index, objectPolar, objectRotation) => {
    // var objectRotation = controls.getAzimuthalAngle(),
    //     objectPolar = controls.getPolarAngle()

    if (objectRotation >= min && objectRotation <= max && objectPolar >= polar) {
        imgAnimate(index, 1, 'all')
    } else {
        imgAnimate(index, 0, 'none')
    }

}

export {imgAnimate, imgAnimation}