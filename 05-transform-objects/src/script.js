import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI()



/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0,
}

// Clock
const clock = new THREE.Clock()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group();
group.position.y = 0
group.rotation.y = 0
scene.add(group)

// Debug
gui.add(group.position, 'y').min( - 3).max( 3).step(0.01)
gui.add(group.position, 'x').min( - 3).max( 3).step(0.01)
gui.add(group.position, 'z').min( - 3).max( 3).step(0.01)

const parametersCube = {
    color: 0xFF0000,
    spin: () => {
        gsap.to(cube1.rotation, {duration: 1, y: cube1.rotation.y + Math.PI * 2 })
    }
}

const parametersCone = {
    color: 0x00FF00,
    spin: () => {
        gsap.to(cone2.rotation, {duration: 1, x: cone2.rotation.x + Math.PI * 2 })
    }
}

const parametersSphere = {
    color: 0x9F33FF
}

const materialCube = new THREE.MeshBasicMaterial({color: parametersCube.color})
const materialCone = new THREE.MeshBasicMaterial({color: parametersCone.color})
const materialSphere = new THREE.MeshBasicMaterial({color: parametersSphere.color})

gui.add(materialCube, 'wireframe').name('Cube material')
gui.add(materialCone, 'wireframe').name('Cone material')
gui.add(materialSphere, 'wireframe').name('Sphere material')

gui.addColor(parametersCube, 'color').name('Cube Color')
    .onChange(()=> {
        materialCube.color.set(parametersCube.color)
    })

gui.add(parametersCube, 'spin').name('Cube Spin')
gui.add(parametersCone, 'spin').name('Cone Spin')


gui.addColor(parametersCone, 'color').name('Cone Color')
    .onChange(()=> {
        materialCone.color.set(parametersCone.color)
    })

gui.addColor(parametersSphere, 'color').name('Sphere Color')
    .onChange(()=> {
        materialSphere.color.set(parametersSphere.color)
    })



const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    materialCube
)

group.add(cube1)

const cone2 = new THREE.Mesh(
    new THREE.ConeGeometry( 1, 1.5, 4 ),
    materialCone
)
cone2.position.x = -2
group.add(cone2)


const sphere3 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 15, 15),
    materialSphere
)
sphere3.position.x = 2
group.add(sphere3)

gui.add(cube1, 'visible').name('Cube')
gui.add(cone2, 'visible').name('Cone')
gui.add(sphere3, 'visible').name('Ball')



// const axesHelper = new THREE.AxesHelper(3)
// scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', (e) => {
    sizes.width =  window.innerWidth
    sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', (e) => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (! fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
});


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.set(0, 0, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animation
 */
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // group.rotation.y += 0.01 * elapsedTime
    /* camera.position.x = Math.cos(cursor.x * Math.PI) * 3 // Math.cos(cursor.x)
    camera.position.z = Math.cos(cursor.x * Math.PI) * 3 
    camera.position.y = cursor.x * 5 // Math.sin(cursor.y)
    
    // camera.lookAt(group.position)
    camera.lookAt(group.position) */ 

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
