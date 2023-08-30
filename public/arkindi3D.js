import * as THREE from 'three'
import { MTLLoader } from './jsm/loaders/MTLLoader.js'
import { OBJLoader } from './jsm/loaders/OBJLoader.js'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from './jsm/renderers/CSS2DRenderer.js'
// import { RGBLoader } from './jsm/loaders/RGBLoader.js'
import { imgAnimate, imgAnimation } from './utils.js'

var camera,
    controls,
    scene,
    renderer,
    model,
    topLight,
    labelRender,
    hemiLight,
    ambientLight,
    objectGarage

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20)
camera.position.set(-0.01940470264157388, 0.27246736417664036, 2.9030541470101876)

scene = new THREE.Scene()
scene.add(camera)

const loading = new THREE.LoadingManager()
const div_load = document.querySelector('.loading')

loading.onLoad = function () {
    div_load.style.display = 'none'
    console.log('complete')
}

// model
// const onProgress = function ( xhr ) {

// if ( xhr.lengthComputable ) {

//     const percentComplete = xhr.loaded / xhr.total * 100;
//     console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

// }

// };
new MTLLoader().setPath('assets/obj/Arkadin/').load('BATIS.mtl', function (materials) {
    materials.preload()

    new OBJLoader(loading)
        .setMaterials(materials)
        .setPath('assets/obj/Arkadin/')
        .load('BATIS.obj', function (object) {
            model = object
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                }
                var material = child.material
                // console.log(child.material);
                if (material && material.map) {
                    material.map.anisotropy = 16
                }
            })
            model.position.set(1.8, -0.2 - 0.2, 0)
            model.scale.set(0.00005, 0.00005, 0.00005)
            scene.add(model)
            habillagelabel.position.set(0.22, 0.6 - 0.2, 0.42)
            scene.add(habillagelabel)
            baielabel.position.set(0.685, 0.02 - 0.2, 0.26)
            scene.add(baielabel)
            gardelabel.position.set(-0.15, -0.24 - 0.2, 0.58)
            scene.add(gardelabel)
            oeillabel.position.set(0, 1.3 - 0.2, 0)
            scene.add(oeillabel)
            interieurlabel.position.set(0.01, -0.036, 0)
            scene.add(interieurlabel)
            oeilbarrelabel.position.set(0.015, -0.019, 0.14)
            scene.add(oeilbarrelabel)
            akorlabel.position.set(0.3275, -0.7, 0.75)
            scene.add(akorlabel)
        })
})

new MTLLoader().setPath('assets/obj/Garage/').load('ABRISVOITURE.mtl', function (materials) {
    materials.preload()

    new OBJLoader(loading).setMaterials(materials)
    .setPath('assets/obj/Garage/')
    .load('ABRISVOITURE.obj', function (object) {
        objectGarage = object
        objectGarage.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
            var material = child.material
            // console.log(child.material);
            if (material && material.map) {
                material.map.anisotropy = 16
            }
        })
        objectGarage.position.set(-1.3, -0.6, 1.1)
        objectGarage.scale.set(0.00009, 0.00009, 0.00009)
        objectGarage.rotation.set(-Math.PI / 2, 0, 0.35)
        exterieurlabel.position.set(-1.06, -0.5, 0.763)
        scene.add(objectGarage)
        scene.add(exterieurlabel)

})
})
new MTLLoader().setPath('assets/obj/Cloison/').load('CLOISONAMOVIBLE.mtl', function (materials) {
    materials.preload()

    new OBJLoader(loading).setMaterials(materials)
    .setPath('assets/obj/Cloison/')
    .load('CLOISONAMOVIBLE.obj', function (object) {
        object.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
            var material = child.material
            // console.log(child.material);
            if (material && material.map) {
                material.map.anisotropy = 16
            }
        })
        object.position.set(-0.276,-0.086, 0)
        object.scale.set(0.00004, 0.00004, 0.00004)
        object.rotation.set(-Math.PI / 2, 0, 0.35)
        scene.add(object)  

})
})
// ------------------Render 2D----------
labelRender = new CSS2DRenderer()
labelRender.setSize(window.innerWidth, window.innerHeight)
labelRender.domElement.style.position = 'absolute'
labelRender.domElement.style.top = '0px'
labelRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRender.domElement)

const create2DElement = (urlImage, altImage, classImage, classDiv) => {
    let img, div, label
    img = document.createElement('img')
    img.className = classImage
    img.src = urlImage
    img.alt = altImage

    div = document.createElement('div')
    div.appendChild(img)
    div.className = classDiv
    label = new CSS2DObject(div)
    return [label, div]
}

const [habillagelabel, habillagediv] = create2DElement(
    'assets/icon/iconizer-facade-de-maison-de-trois-etages.svg',
    'img_facade',
    'imgi',
    'divi'
)
const [baielabel, baiediv] = create2DElement(
    'assets/icon/iconizer-porte-coulissante.svg',
    'img_baie',
    'imgi',
    'divi'
)
const [gardelabel, gardediv] = create2DElement('assets/icon/iconizer-escaliers_1.svg', 'img_escalier', 'imgi', 'divi')
const [oeillabel, oeildiv] = create2DElement('assets/icon/iconizer-oeil.svg', 'img_oeil', 'imgi', 'divi')
const [interieurlabel, interieurdiv] = create2DElement(
    'assets/icon/iconizer-plan-de-la-maison.svg',
    'img_interieur',
    'imgi',
    'divi'
)
const [oeilbarrelabel, oeilbarrediv] = create2DElement('assets/icon/download.svg', 'img_oeilbarre', 'imgi', 'divi')
const [akorlabel, divAkor] = create2DElement('assets/icon/akor.PNG', 'akor_img', 'img', 'div')
const [exterieurlabel, exterieurdiv] = create2DElement('assets/icon/icon.png', 'exterieur_img','imgi','divi')

// scene.add(new THREE.AxesHelper(20))

// ------------------Render 2D----------

renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

renderer.setClearColor(0xe86222)
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.5
renderer.shadowMap.enabled = true

controls = new OrbitControls(camera, renderer.domElement)
controls.maxPolarAngle = Math.PI / 2
controls.maxDistance = 4.2
controls.minDistance = 1.4
controls.enablePan = false

// -------control of the light---------
topLight = new THREE.DirectionalLight(0xffffff, 5)
topLight.position.set(100, 100, 100)
topLight.castShadow = true
topLight.color.setHSL(0.1, 1, 0.95)
topLight.shadow.mapSize.width = 3 * 1024
topLight.shadow.mapSize.height = 3 * 1024
// topLight.shadow.bias = - 0.0001

scene.add(topLight)

ambientLight = new THREE.AmbientLight(0x333333, 3)
scene.add(ambientLight)
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
hemiLight.color.setHSL(0.6, 0.75, 0.5)
hemiLight.groundColor.setHSL(0.095, 0.5, 0.5)
hemiLight.position.set(0, 500, 0)
scene.add(hemiLight)

window.addEventListener('resize', onWindowResize)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    labelRender.setSize(window.innerWidth, window.innerHeight)
}

// const imgAnimate = (index,opacity,pointerEvents,delay) => {
// 	imgLabel = [...document.querySelectorAll('.imgi')]
// 	divLabel = [...document.querySelectorAll('.divi')]
// 	gsap.to(imgLabel[index],{
// 		opacity,
// 		duration: 1,
// 		delay
// 	})
// 	gsap.to(divLabel[index],{
// 		opacity,
// 		duration: 1,
// 		pointerEvents,
// 		delay
// 	})
// 	return divLabel
// }

// const imgAnimation = (min,max,polar,index) => {
// 	var objectRotation = controls.getAzimuthalAngle(),
// 		objectPolar = controls.getPolarAngle()

// 	if(objectRotation >= min && objectRotation <= max && objectPolar >= polar){
// 		imgAnimate(index,1,'all')
// 	}else{
// 		imgAnimate(index,0,'none')
// 	}

// 	// return divLabel
// }

const cameraAnimation = (x,y,z)=>{
    gsap.to(camera.position, {

    })
}

const oeilAnimation = (distance) => {
    controls.minDistance = distance
            gsap.to(camera.position, {
                x: 1,
                y: 0,
                z: 3,
                duration: 2,
                ease: 'power3.inOut',
                onUpdate: () => {
                    camera.lookAt(0, 0, 0)
                },
            })
            gsap.to(camera.position, {
                x: 0.11066862322831016,
                y: 0.01839855031706282,
                z: 0.25157689741032024,
                delay: 2.2,
                duration: 2,
                ease: 'power3.inOut',
                onUpdate: () => {
                    camera.lookAt(0, 0, 0)
                },
            })
            gsap.to('.header', {
                opacity: 0,
                duration: 1.5,
                pointerEvents: 'none',
            })
            imgAnimate(4, 1, 'all', 4.3)
            imgAnimate(5, 1, 'all', 4.3)
            controls.enabled = false
}

habillagediv.addEventListener('click', ()=>{
    window.location.href = './Demo-page/Habillage_Facade.html'
})
baiediv.addEventListener('click', ()=>{
    window.location.href = './Demo-page/Baies.html'
})
divAkor.addEventListener('click', ()=>{
    window.location.href = './3D.html'
})
interieurdiv.addEventListener('click', ()=>{
    window.location.href = './Demo-page/Amenagement_Interieur.html'
})
gardediv.addEventListener('click', ()=>{
    window.location.href = './Demo-page/Garde_corp.html'
})
exterieurdiv.addEventListener('click', ()=>{
    window.location.href = './Demo-page/Amenagement_Exterieur.html'
})

const controlChange = () => {
    // console.log(executed)
    var objectRotation = controls.getAzimuthalAngle(),
        objectPolar = controls.getPolarAngle()
    var distance = controls.getDistance(),
        divLabel = imgAnimate()
    // console.log(camera.position);
    if (divLabel[3]) {
        divLabel[3].addEventListener('click', () => {
            controls.minDistance = 0.06
            gsap.to(camera.position, {
                x: 1,
                y: 0,
                z: 3,
                duration: 2,
                ease: 'power3.inOut',
                onUpdate: () => {
                    camera.lookAt(0, 0, 0)
                },
            })
            gsap.to(camera.position, {
                x: 0.11066862322831016,
                y: 0.01839855031706282,
                z: 0.25157689741032024,
                delay: 2.2,
                duration: 2,
                ease: 'power3.inOut',
                onUpdate: () => {
                    camera.lookAt(0, 0, 0)
                },
            })
            gsap.to('.header', {
                opacity: 0,
                duration: 1.5,
                pointerEvents: 'none',
            })
            imgAnimate(4, 1, 'all', 4.3)
            imgAnimate(5, 1, 'all', 4.3)
            controls.enabled = false    
        })
    }

    if (divLabel[5]) {
        divLabel[5].addEventListener('click', () => {
            controls.minDistance = 1.4
            gsap.to(camera.position, {
                x: 1,
                y: 0,
                z: 3,
                duration: 2,
                ease: 'power3.inOut',
                onUpdate: () => {
                    camera.lookAt(0, 0, 0)
                },
            })
            gsap.to('.header', {
                opacity: 1,
                duration: 1.5,
                delay: 2,
                pointerEvents: 'all',
            })
            imgAnimate(4, 0, 'none')
            imgAnimate(5, 0, 'none')
            controls.enabled = true
        })
    }
    // console.log( `rotation:${objectRotation} | polar:${objectPolar} | distance:${distance}` );
    imgAnimation(-0.5, 1.1, 0.6, 0, objectPolar, objectRotation)
    imgAnimation(-0.1, 0.7, 1.2, 1, objectPolar, objectRotation)
    imgAnimation(-0.2, 0.55, 1.1, 2, objectPolar, objectRotation)
    imgAnimation(-0.2, 0.55, 1.1, 6, objectPolar, objectRotation)

    if (distance >= 4) {
        imgAnimate(3, 1, 'all')
    } else {
        imgAnimate(3, 0, 'none')
    }
    if (objectRotation >= -0.4 && objectRotation <= 0.8 && objectPolar >= 1.3) {
        gsap.to('.img', {
            opacity: 1,
            duration: 1,
        })
        gsap.to('.div', {
            opacity: 1,
            pointerEvents: 'all',
            duration: 1,
        })
    } else {
        gsap.to('.img', {
            opacity: 0,
            duration: 1,
        })
        gsap.to('.div', {
            opacity: 0,
            pointerEvents: 'none',
            duration: 1,
        })
    }
}

function animate() {
    controlChange()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update()
    labelRender.render(scene, camera)             
}

animate()
