import * as THREE from 'three';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject} from './jsm/renderers/CSS2DRenderer.js'
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from './jsm/loaders/DRACOLoader.js'
// import { RGBLoader } from './jsm/loaders/RGBLoader.js'

let camera, controls, scene, renderer,model,hemiLight,topLight,labelRender
	,portelabel,fenetrelabel,garagelabel,ambientLight,object,arkindilabel,divAkor

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );
camera.position.z = 2.5;

// scene

scene = new THREE.Scene();
scene.add( camera );

// model

// const onProgress = function ( xhr ) {

// if ( xhr.lengthComputable ) {

//     const percentComplete = xhr.loaded / xhr.total * 100;
//     console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

// }

// };
const loading = new THREE.LoadingManager()
const div_load = document.querySelector('.loading')

loading.onLoad = function() {
    div_load.style.display = 'none'
    console.log("complete")
}
const loader = new GLTFLoader(loading)

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
dracoLoader.setDecoderConfig({type:'js'})
loader.setDRACOLoader(dracoLoader)

loader.load('./Akor.glb',(gltf) => {
	object = gltf.scene;
	// object.traverse( child => {
	// 	if(child.isMesh){
	// 		child.castShadow = true
	// 		child.receiveShadow = true	
	// 	}
	// 	// var material = child.material
	// 	// if(material && material.map){
	// 	// 	material.map.anisotropy = 16
	// 	// }
	// })
	object.rotation.set(-Math.PI/2,0,0)
    object.position.set(-0.8,0,0.5)
	object.scale.set(0.0001,0.0001,0.0001)
	scene.add(portelabel)
	portelabel.position.set(-0.9,0.095,0)
	scene.add(fenetrelabel)
	fenetrelabel.position.set(-0.175,0.168,-0.17)
	garagelabel.position.set(-0.168,0.16,0.1)
	scene.add(garagelabel)
	arkindilabel.position.set(0,-0.3,0.6)
	scene.add(arkindilabel)
	scene.add(object)
})


// new MTLLoader()
// 	.setPath( 'AKORDIGUE/' )
// 	.load( 'SRAKOORDIGUE.mtl', ( materials ) => {

// 		materials.preload();

// 		new OBJLoader()
// 			.setMaterials( materials )
// 			.setPath( 'AKORDIGUE/' )
// 			.load( 'SRAKOORDIGUE.obj', ( object ) => {
// 				model = object
// 				model.traverse( child => {
// 					if(child.isMesh){
// 						child.castShadow = true
// 						child.receiveShadow = true	
// 					}
// 					var material = child.material
// 					if(material && material.map){
// 						material.map.anisotropy = 16
// 					}
// 				})	
// 				model.rotation.set(-Math.PI/2,0,0)
// 				model.position.set(-0.8,0,0.5)
// 				model.scale.set(0.0001,0.0001,0.0001)
// 				scene.add( model )
// 				scene.add(portelabel)
//     			portelabel.position.set(-0.9,0.095,0)
// 				scene.add(fenetrelabel)
// 				fenetrelabel.position.set(-0.175,0.168,-0.17)
// 				garagelabel.position.set(-0.168,0.16,0.1)
// 				scene.add(garagelabel)
// 			});

// 	} );

//
// ------------------Render 2D----------
labelRender = new CSS2DRenderer()
labelRender.setSize(window.innerWidth, window.innerHeight)
labelRender.domElement.style.position = 'absolute'
labelRender.domElement.style.top = '0px'
labelRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRender.domElement)

const create2DElement = (urlImage,altImage,classImage,classDiv) => {
	let img,div,label
	img = document.createElement('img')
	img.className = classImage
	img.src = urlImage
	img.alt = altImage

	div = document.createElement('div')
	div.appendChild(img)
	div.className = classDiv
	label = new CSS2DObject(div)
	return label
}

portelabel = create2DElement('./assets/icon/iconizer-ouverture-de-porte-ouverte.svg',"img_porte","imgi","divi")
fenetrelabel = create2DElement('./assets/icon/iconizer-la-fenetre.svg',"img_fentere","imgi","divi")
garagelabel = create2DElement('./assets/icon/iconizer-garage.svg', 'img_garage','imgi','divi')
arkindilabel = create2DElement('./assets/icon/Arkindi.PNG', 'img_arkindi','imgAkor','akor')

// ------------------Render 2D----------
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// renderer.setClearColor(0xfffff5)
renderer.setClearColor(0xE86222)
// renderer.toneMapping = THREE.ReinhardToneMapping
// renderer.toneMappingExposure = 2
// renderer.shadowMap.enabled = true

// renderer.toneMapping = THREE.CineonToneMapping
// renderer.toneMappingExposure = 1.1
// renderer.shadowMap.enabled = true
//

controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI/2
controls.maxDistance = 3
controls.minDistance = 1.3
controls.enablePan = false

// -------control of the light---------

topLight = new THREE.DirectionalLight(0xffffff, 5); 
topLight.position.set(100, 100, 100) 
topLight.castShadow = true;
topLight.color.setHSL(0.1,1,0.95)
topLight.shadow.mapSize.width = 3*1024
topLight.shadow.mapSize.height = 3*1024
scene.add(topLight);
// scene.add(new THREE.DirectionalLightHelper(topLight))

ambientLight = new THREE.AmbientLight(0x333333, 3);
scene.add(ambientLight);
hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.75 );
hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

// -------control of the light---------

// scene.add(new THREE.AxesHelper(20))
window.addEventListener( 'resize', onWindowResize );
// --------display icon----------
const controlChange = () => {
	
	let imgLabel = [...document.querySelectorAll('.imgi')]
	let divLabel = [...document.querySelectorAll('.divi')]

	var objectRotation = controls.getAzimuthalAngle(),
		objectPolar = controls.getPolarAngle()
	
	console.log(`rotation:${objectRotation} | polar:${objectPolar}`);	

	if(objectRotation <= -1.5 && objectRotation >= -1.9 && objectPolar >= 0.8){
		
		gsap.to(imgLabel[0], {
			opacity: 1,
			duration: 1	
		  })
		gsap.to(divLabel[0], {
			opacity: 1,
			duration: 1,
			pointerEvents: 'all'
		})
		
	}else if(objectRotation >= -3.2 && objectRotation <= -2.7 && objectPolar >= 0.8 || objectRotation >= 2.7 && objectRotation <= 3.2 && objectPolar >= 0.8){
		gsap.to(imgLabel[1], {
			opacity: 1,
			duration: 1	
		  })
		gsap.to(divLabel[1], {
			opacity: 1,
			duration: 1,
			pointerEvents: 'all'
		})
	}else if(objectRotation >= -0.3 && objectRotation <= 0.3 && objectPolar >= 0.8){
		gsap.to(imgLabel[2],{
			opacity: 1,
			duration: 1
		})
		gsap.to(divLabel[2], {
			opacity: 1,
			duration: 1,
			pointerEvents: 'all'
		})
	}
	else{
		for(let i=0; i<3; i++){
			gsap.to(imgLabel[i], {
				opacity: 0,
				duration: 1
			
				})
			gsap.to(divLabel[i], {
				opacity: 0,
				duration: 1,
				pointerEvents: 'none'
			})
		}
		}
	
	if(objectRotation >= -0.4 && objectRotation <= 0.8 && objectPolar >= 1.3){
		gsap.to('.imgAkor',{
			opacity: 1,
			duration: 1
		})
		gsap.to('.akor',{
			opacity: 1,
			pointerEvents: 'all',
			scale: 1.5,
			duration: 1
		})
	}else{
		gsap.to('.imgAkor',{
			opacity: 0,
			duration: 1,
			width: '3rem',
			height: '3rem'
		})
		gsap.to('.akor',{
			opacity: 0,
			pointerEvents: 'none',
			padding: '15px',
			duration: 1
		})
	}

	
}


// --------display icon----------

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );
labelRender.setSize(window.innerWidth, window.innerHeight)
}

//
var executate = true
function animate() {
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update()
	labelRender.render(scene, camera)
	controlChange()
	divAkor = document.querySelector('.akor')
	if(divAkor && executate){
		divAkor.addEventListener('click', () => {
			window.location.href = 'index.html'
		})
		executate = false
	}
}

animate()