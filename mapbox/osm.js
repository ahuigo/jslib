function lon2tile(lon, zoom) {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}

function lat2tile(lat, zoom) {
    return Math.floor(
        ((1 -
            Math.log(
                Math.tan((lat * Math.PI) / 180) +
                    1 / Math.cos((lat * Math.PI) / 180)
            ) /
                Math.PI) /
            2) *
            Math.pow(2, zoom)
    );
}

function tile2lon(x, z) {
    return (x / Math.pow(2, z)) * 360 - 180;
}

function tile2lat(y, z) {
    var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

function getTileBBox(x, y, zoom) {
    const left = tile2lon(x, zoom);
    const right = tile2lon(x + 1, zoom);
    const top = tile2lat(y, zoom);
    const bottom = tile2lat(y + 1, zoom);
    return [left, bottom, right, top];
}

export function tilesInBBox(left, bottom, right, top, zoom) {
    const top_tile = lat2tile(top, zoom);
    const left_tile = lon2tile(left, zoom);
    const bottom_tile = lat2tile(bottom, zoom);
    const right_tile = lon2tile(right, zoom);
    const tiles = [];
    for (let x = left_tile; x <= right_tile; x++) {
        for (let y = top_tile; y <= bottom_tile; y++) {
            const tile = {
                id: `${zoom},${x},${y}`,
                bbox: getTileBBox(x, y, zoom)
            };
            tiles.push(tile);
        }
    }
    return tiles;
}
