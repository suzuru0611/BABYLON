const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    
    const alpha =  Math.PI/4;
    const beta = Math.PI/3;
    const radius = 10;
    const target = new BABYLON.Vector3(0, 0, 0);
    
    const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(5, 5, 0));
    const ground = buildGround(); 

    const detached_house = buildHouse(1);
    detached_house.rotation.y = -Math.PI / 16;
    detached_house.position.x = -6.8;
    detached_house.position.z = 2.5;

    const semi_house = buildHouse(2);
    semi_house .rotation.y = -Math.PI / 16;
    semi_house.position.x = -4.5;
    semi_house.position.z = 3;

    








    //create instance from first two that we built
    const house = [];
    for (let i=0;i<places.length; i++){
        if(places[i][0]===1){
            house[i]=detached_house.createInstance('house'+i);
        }else{
            house[i]=semi_house.createInstance('house'+i);
        }
        houses[i].rotation.y = places[i][1];
        houses[i].position.x = places[i][2];
        houses[i].position.z = places[i][3];
    }

    return scene;
};


const buildHouse =(width)=>{
    const box = buildBox(width);
    const roof =buildRoof(width);
    return BABYLON.Mesh.MergeMeshes([box,roof],true,false,null,false,true);    
}

const buildGround=()=>{
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

    const ground = BABYLON.MeshBuilder.CreateGround('ground',{width:10,height:10});
    ground.material = groundMat;
}

const buildBox = (width) => {
    //texture
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    if (width===2){
        boxMat.diffuseTexture = new BABYLON.Texture("cubehouse.png")
    }else{
        boxMat.diffuseTexture = new BABYLON.Texture("semihouse.png")
    }

    //options parameter to set different images on each side
    const faceUV = [];
    if(width===2){
        faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
    }else{
        faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    }

    // top 4 and bottom 5 not seen so not set

    /**** World Objects *****/
    const box = BABYLON.MeshBuilder.CreateBox("box", {width:width,faceUV: faceUV, wrap: true});
    box.material = boxMat;
    box.position.y = 0.5;
    
    return box;

}

const buildRoof= (width)=>{
    //texture 
    const roofMat = new BABYLON.StandardMaterial("roofMat")
    roofMat.diffuseTexture= new BABYLON.Texture("01.jpg")
    roofMat.bumpTexture= new BABYLON.Texture("03.png")

    const roof =BABYLON.MeshBuilder.CreateCylinder("roof",{diameter:1.3,height:1.2,tessellation:3});
    roof.material= roofMat;
    roof.scaling.x = 0.75;
    roof.scaling.y = width ;
    roof.rotation.z=Math.PI/2
    roof.position.y=1.2;
    return roof
}

const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
});