var viewer = new Cesium.Viewer('cesiumContainer');
var p = Cesium.Cartesian3.fromDegreesArrayHeights([
                116.00500779274114, 39.87638678884143,15500,
                115.94500779274114, 39.27638678884143,18000,
                114.94500779274114, 38.27638678884143,18800,
            ]);
/*
    viewer.entities.add({
        polyline : {
            positions : p,
            width : 50.0,
            material : Cesium.Color.ORANG
        }
    });
//viewer.zoomTo(viewer.entities);
  */              
var polylines = new Cesium.PolylineCollection();


polylines.add({
  positions : p,
  width : 4,
    loop:true,
    show: true,
      material : Cesium.Material.fromType('Color', {
        color : new Cesium.Color(244.0, 67, 54, 1.0)
    }),
});
    
    viewer.scene.primitives.add(polylines);
                
