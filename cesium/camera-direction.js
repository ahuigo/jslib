// Set the initial view
/*
viewer.scene.camera.setView({
    destination : new Cesium.Cartesian3.fromDegrees(116.298114468289017509, 39.874512895646692812, 53109.082799425431),
        orientation : new Cesium.HeadingPitchRoll.fromDegrees(1, -90, 0.0),

});

*/

async function sleep(n){
    await new Promise(r=>{ setTimeout(r,n*1000)
})

}

async function f(){
    for(var i=1; i<40; i++){
        // Set the initial view
        await sleep(0.05)
        viewer.scene.camera.setView({
            //destination : new Cesium.Cartesian3.fromDegrees(116.498114468289017509, 39.884512895646692812, 14632.282799425431),
    destination : new Cesium.Cartesian3.fromDegrees(116.298114468289017509, 39.874512895646692812, 53109.082799425431),
            orientation : new Cesium.HeadingPitchRoll.fromDegrees(i,-90, 0),
        });
        console.log('i',i)
    }
}
f()



