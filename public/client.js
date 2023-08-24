
import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'
import { CSS2DRenderer, CSS2DObject} from './jsm/renderers/CSS2DRenderer.js'

window.addEventListener("resize", onWindowResize, false)

// const container = document.getElementById("container_3D")

var Width = window.innerWidth
var Height = window.innerHeight

const scene = new THREE.Scene()
const page = document.querySelector('.page')
const camera = new THREE.PerspectiveCamera(45, Width / Height, 1, 1000);
camera.position.set(2, 0, 4)
camera.lookAt(scene.position)
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setClearColor(0xE86222)
renderer.setSize(Width, Height)
const portes = new Array()
for(let i=18; i<36; i++){
  portes.push(i)
}
const grandefenetres = new Array()
for(let i=1; i<8; i++){
  grandefenetres.push(i)
}

let object,
    controls

const loading = new THREE.LoadingManager()
const div_load = document.querySelector('.loading')

const loader = new GLTFLoader(loading);

const raycaster = new THREE.Raycaster();

controls = new OrbitControls(camera, renderer.domElement)

controls.maxPolarAngle = Math.PI/2
controls.enablePan = false
controls.minDistance = 1.2
controls.maxDistance = 5
// var arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(), new THREE.Vector3(), 500, 0x000000)
// scene.add(arrowHelper)
loading.onLoad = function(){
  div_load.style.display = 'none'
  console.log("complete")
}

const labelRender = new CSS2DRenderer()
labelRender.setSize(Width, Height)
labelRender.domElement.style.position = 'absolute'
labelRender.domElement.style.top = '0px'
labelRender.domElement.style.pointerEvents = 'none'

const imgporte = document.createElement('img')
imgporte.className = "img"
imgporte.src = './assets/icon/iconizer-ouverture-de-porte-ouverte.svg'
imgporte.alt = "img_porte"

const imgfenetre = document.createElement('img')
imgfenetre.className = "img"
imgfenetre.src = './assets/icon/iconizer-la-fenetre.svg'
imgfenetre.alt = "img_fenetre"

const imgoeil = document.createElement('img')
imgoeil.className = "img"
imgoeil.src = './assets/icon/iconizer-oeil.svg'
imgoeil.alt = "img_oeil"

const imgoeilbarre = document.createElement('img')
imgoeilbarre.className = 'imgi'
// imgoeilbarre.style.opacity = 0
imgoeilbarre.src = './assets/icon/download.svg'
imgoeilbarre.alt = "img_oeil"

const imgostair = document.createElement('img')
imgostair.className = 'imgi'
// imgostair.style.opacity = 0
imgostair.src = './assets/icon/iconizer-escaliers_1.svg'
imgostair.alt = "img_stair"

const div = document.createElement('div')
div.appendChild(imgporte)
div.className = "div"
const portelabel = new CSS2DObject(div)

const div2 = document.createElement('div')
div2.appendChild(imgfenetre)
div2.className = "div"
const fenetrelabel = new CSS2DObject(div2)

const div3 = document.createElement('div')
div3.appendChild(imgoeil)
div3.className = "div"
const oeillabel = new CSS2DObject(div3)

const div4 = document.createElement('div')
div4.appendChild(imgoeilbarre)
div4.className = "divi"
// div4.style.opacity = 0
const oeillabelbarre = new CSS2DObject(div4)

const div5 = document.createElement('div')
div5.appendChild(imgostair)
div5.className = "divi"
// div5.style.opacity = 0
const stairlabel = new CSS2DObject(div5)

let clading, cladingMaterial, Box, parter

loader.load(
  `models/modern_home/scene.gltf`,
  function (gltf) {
    
    object = gltf.scene;
    object.position.set(0, -0.3, 0)
    object.scale.set(0.00013,0.00013,0.00013)

    clading = object.getObjectByName('Cladding')
    Box = object.getObjectByName('Box009')
    parter = object.getObjectByName('Parter001')
    var i = 1
    object.traverse((child)=>{
      if(child.material){
        i = i+1
        if(i==4){
          cladingMaterial = child.material
        }
      }
      
    })

    scene.add(object);
    scene.add(portelabel)
    portelabel.position.set(-0.25,-0.1,0.025)
    scene.add(fenetrelabel)
    fenetrelabel.position.set(0.17,0.33,-0.25)
    scene.add(oeillabel)
    oeillabel.position.set(0.2,1.2,-0.7)
    scene.add(oeillabelbarre)
    oeillabelbarre.position.set(1.2,-0.1,0.1)
    scene.add(stairlabel)
    stairlabel.position.set(0.5,-0.1,-0.27)
  },
);
gsap.registerPlugin(SlowMo)

div.addEventListener('click', ()=>{
  window.location.href = './Demo-page/Porte.html'
}, false)
div2.addEventListener('click', ()=>{
  window.location.href = './Demo-page/Fenetre.html'
}, false)
let intersects = new Array()
var select
imgoeilbarre.addEventListener('click',()=>{
  controls.enabled = true
  gsap.to('.header', {
    opacity: 1,
    duration: 1.5,
    pointerEvents: 'all'
  })
  gsap.to('.imgi', {
    opacity: 0,
    duration: 1

  })
  gsap.to('.divi', {
    opacity: 0,
    duration: 1
  })
  
  gsap.to(cladingMaterial, {
    transparent : true,
    opacity: 1,
    duration: 2,
    delay: 2.1,
  })
  
  gsap.to(clading, {
    visible: true,
    duration: 2,
    delay: 2.1,
  })
  gsap.to(Box, {
    visible: true,
    duration: 0.1,
  })
  gsap.to(parter, {
    visible: true,
    duration: 0.1,
  })

  gsap.to(camera.position, {
    x: 2,
    y: 0,
    z: 4,
    duration: 2,
    onUpdate: ()=>{
      camera.lookAt(0,0,0)
    },
  })
  
  gsap.to(object.position,{
    x: 0,
    y:-0.3,
    z: 0,
    duration: 2,
    onUpdate: ()=>{
      camera.lookAt(0,0,0)
    },
  })
  gsap.to('.div', {
    opacity: 1,
    delay: 3.3,
    duration: 1.2
  })
  gsap.to('.img', {
    opacity: 1,
    delay: 3.3,
    duration: 1.2
  })

},false)

imgoeil.addEventListener('click', ()=>{
  console.log("touche")
  controls.enabled = false
  gsap.to('.header', {
    opacity: 0,
    duration: 2,
    pointerEvents: 'none'
  })
  gsap.to('.img', {
    opacity: 0,
    duration: 1
  })
  gsap.to('.div', {
    opacity: 0,
    duration: 1
  })
  
  gsap.to(cladingMaterial, {
    transparent : true,
    opacity: 0.0,
    duration: 2,
    delay: 2.1,
    ease: "slow"
  })
  
  gsap.to(clading, {
    visible: false,
    duration: 1,
    delay: 4.5,
  })
  gsap.to(Box, {
    visible: false,
    duration: 1,
    delay: 2.1,
    ease: "slow"
  })
  gsap.to(parter, {
    visible: false,
    duration: 1,
    delay: 2.1,
    ease: "slow"
  })

  gsap.to(camera.position, {
    x: 0.6702701785704406,
    y: 3.380992254599882,
    z: -0.30719332276174643,
    duration: 2,
    onUpdate: ()=>{
      camera.lookAt(0,0,0)
    },
  })
  
  gsap.to(object.position,{
    x: 0.4,
    y:0.4,
    z:0.3,
    duration: 2,
    onUpdate: ()=>{
      camera.lookAt(0,0,0)
    },
  })
  gsap.to('.divi', {
    opacity: 1,
    delay: 4.3,
    duration: 2
  })
  gsap.to('.imgi', {
    opacity: 1,
    delay: 4.3,
    duration: 2
  })
  
}, false)

renderer.domElement.addEventListener('touchmove', onMouseMove, false)
function onMouseMove() {
  select = ""
  
  // raycaster.setFromCamera(
  //     {
  //         x: (event.touches[0].clientX / renderer.domElement.clientWidth) * 2 - 1,
  //         y: -(event.touches[0].clientY / renderer.domElement.clientHeight) * 2 + 1,
  //     },
  //     camera
  // )
  // intersects = raycaster.intersectObjects(scene.children, true)
  // if (intersects.length > 0) {
  //   const firstIntersectedObject = intersects[0].object;
    
  //   select = firstIntersectedObject.parent.name
  //   console.log(select)
  //     let n = new THREE.Vector3()
  //     n.copy(intersects[0].face.normal)
  //     n.transformDirection(intersects[0].object.matrixWorld)
  //     arrowHelper.setDirection(n)
  //     arrowHelper.position.copy(intersects[0].point)
  // }
}

scene.add(new THREE.AxesHelper(20))
renderer.domElement.addEventListener('click', onClick, false);
// renderer.domElement.addEventListener('click', onTouch, false)
function onClick(event) {
  select =""
  var mouse = new THREE.Vector2();
  mouse.x = ((event.clientX - renderer.domElement.offsetLeft)/ renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - renderer.domElement.offsetTop)/ renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera)
  
  intersects = raycaster.intersectObjects(scene.children, true)
  
  if (intersects.length > 0) {
    const firstIntersectedObject = intersects[0].object;
    select = firstIntersectedObject.parent.name
    console.log(select)
    for(var porte of portes){
      if(select ==`Box0${porte}` || select == "Cylinder001" || select == "Cylinder002" || select == "Cylinder003"){
        window.location.href = "./Demo-page/Porte.html"
      }
    }
    for(var grandedfenetre of grandefenetres){
      if(select ==`Box00${grandedfenetre}` || select == "Box037"){
        window.location.href = "./Demo-page/Fenetre.html"  
      }
    }
    
  }
}

// function onTouch(){
//   for(var porte of portes){
//     if(select ==`Box0${porte}` || select == "Cylinder001" || select == "Cylinder002" || select == "Cylinder003"){
//       window.location.href = "./Demo-page/Porte.html"
//     }
//   }
//   for(var grandedfenetre of grandefenetres){
//     if(select ==`Box00${grandedfenetre}` || select == "Box037"){
//       window.location.href = "./Demo-page/Fenetre.html"  
//     }
//   }
// }

document.body.appendChild(renderer.domElement);
document.body.appendChild(labelRender.domElement)

const topLight = new THREE.DirectionalLight(0xffffff, 5); 
topLight.position.set(500, 500, 500) 
topLight.castShadow = true;
scene.add(topLight);

function onWindowResize() {
  var Width = window.innerWidth
  var Height = window.innerHeight
  camera.aspect = Width / Height;
  camera.updateProjectionMatrix();
  renderer.setSize(Width, Height);
  renderer.render(scene, camera);
  labelRender.setSize(Width, Height)
  labelRender.render(scene, camera)
  
}

let isexecuted = false
let isexecuted2 = false
const ambientLight = new THREE.AmbientLight(0x333333, 2);
scene.add(ambientLight);

function zoom(){
  var zoom
  const img = document.querySelectorAll(".img")
  zoom = controls.target.distanceTo( controls.object.position )
  if (zoom < 3 && !isexecuted){
    console.log("agrandir de 3")
    img.forEach((png)=>{
      png.classList.add("scale")
    })
    isexecuted = true
  }else if(zoom > 3 && isexecuted){
    let imgscale = document.querySelectorAll(".img.scale")
    console.log("retrecir de 3")
    imgscale.forEach((png)=>{
      png.classList.remove("scale")
    })
    isexecuted = false
  }else if (zoom < 2 && !isexecuted2){
    console.log("agrandir de 4")
    img.forEach((png)=>{
      png.classList.replace("scale","grand")
    })
    isexecuted2 = true
  }else if(zoom > 2 && isexecuted2){
    let imgscale = document.querySelectorAll(".img.grand")
    console.log("retrecir de 4")
    imgscale.forEach((png)=>{
      png.classList.replace("grand", "scale")
    })
    isexecuted2 = false
  }
}


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
  labelRender.render(scene, camera)
  zoom()
}

animate();