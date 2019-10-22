viewer.scene.camera.setView({
    destination : new Cesium.Cartesian3.fromDegrees(116.4333039,39.9662977,23.35),
    orientation : new Cesium.HeadingPitchRoll.fromDegrees(320.68,-27.84,359.86),
}); 
 var coord = [116.4333885,39.9663355, 133.729296];

//           116.4333039,39.9662977,23.35
 a=window.Cesium.SceneTransforms.wgs84ToWindowCoordinates(
       viewer.scene,
        window.Cesium.Cartesian3.fromDegrees(...coord)
    );
console.log(a) 




