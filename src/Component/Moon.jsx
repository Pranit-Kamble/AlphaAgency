import React from 'react'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect } from 'react'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' 
import './Moon.css'
import {gsap} from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger'
import { ExpoScaleEase } from 'gsap/all'
import TextPlugin from 'gsap/src/TextPlugin'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(TextPlugin)

const Moon = () => {
    useEffect(()=>{
        var moonLoader
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('moon').appendChild( renderer.domElement );
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled = true
        camera.position.setZ(30)
        renderer.render(scene,camera)

        const ambientlight = new THREE.AmbientLight(0xffffff)
        ambientlight.position.set(5,5,5)
        scene.add(ambientlight)
        

        const loader = new GLTFLoader()
        loader.load('./Models/moon.glb',(gltf)=>{
            scene.add(gltf.scene)
            // gsap.from('#moon',{duration:1,y:'-100%',ease:'bounce'})
            //  gsap.to({
              //   scrollTrigger:{
                //     trigger:'#moon',
                //     start:'top 0px',
                //     end:'top 0px',
                //     scrub: true,
          //     markers: true,
          //   }
          //  })
          moonLoader = gltf.scene.children[0]
          moonLoader.position.y=-25
          moonLoader.scale.set(8,5,5)
          
          window.addEventListener('click',function(){
            let count = 0
            if(count===0){
              count++
              gsap.to(gltf.scene.scale, {
                duration: 2,
                x: 0.3,
                y: 0.5,
                z: 0.5,
              });
              gsap.to(gltf.scene.position, {
                duration: 2,
                y: 11
              });
              gsap.to(gltf.scene.rotation, {
                duration:2,
                y:1
              });
            
              const element = document.getElementById('text');
              
              gsap.to(element, {
                duration:2,
                y:10,
                text:`ATTAIN <br/> DIGITAL NIRVANA`
              });
            }
          })
          
          
          
          // gsap.to(moonLoader.scale.set,{
          //   x:3,
          //   y:3,
          //   z:3,
          //   duration:2
          // })
            animate()
        })
        
        // const control = new OrbitControls(camera,renderer.domElement)

         function animate(){
            requestAnimationFrame(animate);
            renderer.render(scene,camera);
            // gsap.to(camera.position,{
            //   z:-1,duration:3
            // })
            setTimeout(()=>{
                moonLoader.rotation.x -= 0.003;
            },100)
          }
        
        
    },[])
  return (
    <div id='moon'>
        <h1 id='text'>THE ALPHA AGENCY</h1>
    </div>
  )
}

export default Moon