
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);


const createScene = () => {
    
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0)); 

    BABYLON.SceneLoader.Append("", "seeeefood.glb", scene, function (scene) {
        // do something with the scene
    });

    return scene;
};
const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
});


