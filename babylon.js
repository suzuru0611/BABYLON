const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Random;
    
    const alpha =  Math.PI/4;
    const beta = Math.PI/3;
    const radius = 10;
    const target = new BABYLON.Vector3(0, 0, 0);
    
    const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(5, 5, 0));
    
    const box01 = BABYLON.MeshBuilder.CreateBox("box", {width:2,height:1.5,depth:3});
    box01.position.x = 0;
    box01.position.y = 0;
    const roof01 = BABYLON.MeshBuilder.CreateCylinder('roof',{diameter:1.2,height:1.2,tessellation:3})
    roof01.position.y =1;
    roof01.rotation.z=Math.PI/2
    
    const groundMat = new BABYLON.StandardMaterial('groundMat')
    groundMat.diffuseTexture = new BABYLON.Texture("./001.png");
    box01.material = groundMat;
    return scene;
};
const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
});