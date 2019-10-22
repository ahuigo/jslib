var viewer = new Cesium.Viewer('cesiumContainer');
    viewer.entities.add({
        polyline : {
            positions : Cesium.Cartesian3.fromDegreesArrayHeights([
                116.00500779274114, 39.87638678884143,15500,
                115.94500779274114, 39.27638678884143,18000,
                114.94500779274114, 38.27638678884143,18800,
            ]),
            width : 50.0,
            material : Cesium.Color.ORANGE,
            // clampToGround : true
        }
    });

var redPolygon = viewer.entities.add({
    name : 'Red polygon on surface',
    polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0,
                                                        -115.0, 24.0,
                                                        -107.0, 33.0,]),
        material : Cesium.Color.RED
    }
                                                        });

var greenPolygon = viewer.entities.add({
    name : 'Green extruded polygon',
    polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArray([-108.0, 42.0,
                                                        -100.0, 42.0,
                                                        -104.0, 40.0]),
        extrudedHeight: 500000.0,
        material : Cesium.Color.GREEN,
        closeTop : false,
        closeBottom : false
    }
});

var orangePolygon = viewer.entities.add({
    name : 'Orange polygon with per-position heights and outline',
    polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights([-108.0, 25.0, 100000,
                                                               -100.0, 25.0, 100000,
                                                               -100.0, 30.0, 100000,
                                                               -108.0, 30.0, 300000]),
        extrudedHeight: 0,
        perPositionHeight : true,
        material : Cesium.Color.ORANGE.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});

var bluePolygon = viewer.entities.add({
    name : 'Blue polygon with holes',
    polygon : {
        hierarchy : {
            positions : Cesium.Cartesian3.fromDegreesArray([-99.0, 30.0,
                                                            -85.0, 30.0,
                                                            -85.0, 40.0,
                                                            -99.0, 40.0]),
            holes : [{
                positions : Cesium.Cartesian3.fromDegreesArray([
                    -97.0, 31.0,
                    -97.0, 39.0,
                    -87.0, 39.0,
                    -87.0, 31.0
                ]),
                holes : [{
                    positions : Cesium.Cartesian3.fromDegreesArray([
                        -95.0, 33.0,
                        -89.0, 33.0,
                        -89.0, 37.0,
                        -95.0, 37.0
                    ]),
                    holes : [{
                        positions : Cesium.Cartesian3.fromDegreesArray([
                            -93.0, 34.0,
                            -91.0, 34.0,
                            -91.0, 36.0,
                            -93.0, 36.0
                        ])
                    }]
                }]
            }]
        },
        material : Cesium.Color.BLUE.withAlpha(0.5),
        height : 0,
        outline : true // height is required for outline to display
    }
});

var cyanPolygon = viewer.entities.add({
    name : 'Cyan vertical polygon with per-position heights and outline',
    polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights([
           -90.0, 41.0, 0.0,
           -85.0, 41.0, 500000.0,
           -80.0, 41.0, 0.0
        ]),
        perPositionHeight : true,
        material : Cesium.Color.CYAN.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});

var purplePolygonUsingRhumbLines = viewer.entities.add({
    name : 'Purple polygon using rhumb lines with outline',
    polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArray([-120.0, 45.0,
                                                        -80.0, 45.0,
                                                        -80.0, 55.0,
                                                        -120.0, 55.0]),
        extrudedHeight: 50000,
        material : Cesium.Color.PURPLE,
        outline : true,
        outlineColor : Cesium.Color.MAGENTA,
        //arcType : Cesium.ArcType.RHUMB
    }
});

viewer.zoomTo(viewer.entities);



// Create a circle.
var circle = new Cesium.CircleGeometry({
  center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
  radius : 100000.0
});
var geometry = Cesium.CircleGeometry.createGeometry(circle);
