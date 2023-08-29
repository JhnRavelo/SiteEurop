import * as THREE from 'three'
import { MTLLoader } from './jsm/loaders/MTLLoader.js'
import { OBJLoader } from './jsm/loaders/OBJLoader.js'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from './jsm/renderers/CSS2DRenderer.js'
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from './jsm/loaders/DRACOLoader.js'
import { imgAnimate, imgAnimation } from './utils.js'
// import { RGBLoader } from './jsm/loaders/RGBLoader.js'

let camera, controls, scene, renderer, model, hemiLight, topLight, labelRender, ambientLight, object

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20)
camera.position.z = 2.5

// scene

scene = new THREE.Scene()
scene.add(camera)

const loading = new THREE.LoadingManager()
const div_load = document.querySelector('.loading')

loading.onLoad = function () {
    div_load.style.display = 'none'
    console.log('complete')
}
const loader = new GLTFLoader(loading)

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
dracoLoader.setDecoderConfig({ type: 'js' })
loader.setDRACOLoader(dracoLoader)

loader.load('./assets/obj/Akor/Akor.glb', (gltf) => {
    object = gltf.scene
    object.rotation.set(-Math.PI / 2, 0, 0)
    object.position.set(-0.8, 0, 0.5)
    object.scale.set(0.0001, 0.0001, 0.0001)
    scene.add(portelabel)
    portelabel.position.set(-0.9, 0.095, 0)
    scene.add(fenetrelabel)
    fenetrelabel.position.set(-0.175, 0.168, -0.17)
    garagelabel.position.set(-0.168, 0.16, 0.1)
    scene.add(garagelabel)
    arkindilabel.position.set(0, -0.3, 0.6)
    scene.add(arkindilabel)
    scene.add(object)
})

//
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

const [portelabel, portediv] = create2DElement(
    './assets/icon/iconizer-ouverture-de-porte-ouverte.svg',
    'img_porte',
    'imgi',
    'divi'
)
const [fenetrelabel, fenetrediv] = create2DElement(
    './assets/icon/iconizer-la-fenetre.svg',
    'img_fentere',
    'imgi',
    'divi'
)
const [garagelabel, garagediv] = create2DElement(
    './assets/icon/iconizer-garage.svg',
    'img_garage',
    'imgi',
    'divi'
)
const [arkindilabel, arkindidiv] = create2DElement(
    './assets/icon/Arkindi.PNG',
    'img_arkindi',
    'imgAkor',
    'akor'
)

// ------------------Render 2D----------
renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// renderer.setClearColor(0xfffff5)
renderer.setClearColor(0xe86222)
// renderer.toneMapping = THREE.ReinhardToneMapping
// renderer.toneMappingExposure = 2
// renderer.shadowMap.enabled = true

// renderer.toneMapping = THREE.CineonToneMapping
// renderer.toneMappingExposure = 1.1
// renderer.shadowMap.enabled = true
controls = new OrbitControls(camera, renderer.domElement)
controls.maxPolarAngle = Math.PI / 2
controls.maxDistance = 3
controls.minDistance = 1.3
controls.enablePan = false

// -------control of the light---------

topLight = new THREE.DirectionalLight(0xffffff, 5)
topLight.position.set(100, 100, 100)
topLight.castShadow = true
topLight.color.setHSL(0.1, 1, 0.95)
topLight.shadow.mapSize.width = 3 * 1024
topLight.shadow.mapSize.height = 3 * 1024
scene.add(topLight)
// scene.add(new THREE.DirectionalLightHelper(topLight))

ambientLight = new THREE.AmbientLight(0x333333, 3)
scene.add(ambientLight)
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.75)
hemiLight.color.setHSL(0.6, 0.75, 0.5)
hemiLight.groundColor.setHSL(0.095, 0.5, 0.5)
hemiLight.position.set(0, 500, 0)
scene.add(hemiLight)

// -------control of the light---------

// scene.add(new THREE.AxesHelper(20))
window.addEventListener('resize', onWindowResize)
// --------display icon----------
portediv.addEventListener('click', () => {
    window.location.href = './Demo-page/Porte.html'
})
fenetrediv.addEventListener('click', () => {
    window.location.href = './Demo-page/Fenetre.html'
})
garagediv.addEventListener('click', () => {
    window.location.href = './Demo-page/Fermeture_exterieur.html'
})
arkindidiv.addEventListener('click', () => {
    window.location.href = './index.html'
})


const controlChange = () => {
    // let imgLabel = [...document.querySelectorAll('.imgi')]
    // let divLabel = [...document.querySelectorAll('.divi')]

    var objectRotation = controls.getAzimuthalAngle(),
        objectPolar = controls.getPolarAngle()
    imgAnimation(-1.9, -1.5, 0.8, 0, objectPolar, objectRotation)
    // imgAnimation(-3.2, -2.7, 0.8, 1, objectPolar, objectRotation)
    // imgAnimation(2.7, 3.2, 0.8, 1, objectPolar, objectRotation)
    imgAnimation(-0.3, 0.3, 0.8, 2, objectPolar, objectRotation)
    if (objectRotation >= -3.2 && objectRotation <= -2.7 && objectPolar >= 0.8 || objectRotation >= 2.7 && objectRotation <= 3.2 && objectPolar >= 0.8) {
        imgAnimate(1, 1, 'all')
    } else {
        imgAnimate(1, 0, 'none')
    }
    if (objectRotation >= -0.4 && objectRotation <= 0.8 && objectPolar >= 1.3) {
        gsap.to('.imgAkor', {
            opacity: 1,
            duration: 1,
        })
        gsap.to('.akor', {
            opacity: 1,
            pointerEvents: 'all',
            scale: 1.5,
            duration: 1,
        })
    } else {
        gsap.to('.imgAkor', {
            opacity: 0,
            duration: 1,
            width: '3rem',
            height: '3rem',
        })
        gsap.to('.akor', {
            opacity: 0,
            pointerEvents: 'none',
            padding: '15px',
            duration: 1,
        })
    }
}

// --------display icon----------

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    labelRender.setSize(window.innerWidth, window.innerHeight)
}

//
var executate = true
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update()
    labelRender.render(scene, camera)
    controlChange()
}

animate()
