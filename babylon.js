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
    


    //options parameter to set different images on each side
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // top 4 and bottom 5 not seen so not set
    

    const box01 = BABYLON.MeshBuilder.CreateBox("box", {faceUV:faceUV,wrap:true});
    box01.position.x = 0;
    box01.position.y = 0;
    
    const boxMaterial = new BABYLON.StandardMaterial('boxMaterial')
    boxMaterial.diffuseTexture = new BABYLON.Texture("./cubehouse.png");
    
    box01.material = boxMaterial;
    
    const roof01 = BABYLON.MeshBuilder.CreateCylinder('roof',{diameter:1.4,height:1.3,tessellation:3})
    roof01.position.y =0.8;
    roof01.rotation.z=Math.PI/2
    
    const roofMaterial = new BABYLON.StandardMaterial('roofMaterial')
    roofMaterial.diffuseTexture = new BABYLON.Texture("./01.png");
    roofMaterial.diffuseTexture.uScale = 1.5;
    roofMaterial.diffuseTexture.vScale = 1.5;
    roof01.material = roofMaterial;
    
    
    return scene;
};
const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
});