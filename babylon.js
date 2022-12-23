
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);


const createScene = () => {
    
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.8, 0.8, 0.8);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.2, 8, new BABYLON.Vector3(0, 1, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(5, 2, 5)); 

    BABYLON.SceneLoader.Append("", "seeeeaFood.glb", scene, function (scene) {
        // do something with the scene
    });

    return scene;
};
const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
});


