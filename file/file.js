import { tilesInBBox } from "../quadtile";

/**
 * 文件类
 */
class Mfile {
  static downloadText(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  /**
   * 
   * @param {*Sting} rows 
   */
  static rows2csv(rows) {
    var csvFile = rows.reduce(function (finalVal, row) {
      for (var j = 0; j < row.length; j++) {
        var innerValue = row[j] === null ? '' : row[j].toString();
        if (row[j] instanceof Date) {
          innerValue = row[j].toLocaleString();
        };
        var result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0)
          result = '"' + result + '"';
        if (j > 0)
          finalVal += ',';
        finalVal += result;
      }
      return finalVal + '\n';
    }, '')
    return csvFile;
  }

  /**
   * 
   * @param {*} filename 
   * @param {*} rows 
   * @param {Array} titles 提供标题栏
   */
  static downloadRows(filename, rows, titles = null) {
    if (rows.length > 0) {
      if (!(rows[0] instanceof Array)) {
        var newRows = titles ? [titles] : [Object.keys(rows[0])];
        rows.map((row) => {
          newRows.push(Object.values(row))
        })
        rows = newRows
      } else if (titles) {
        rows.unshift(titles)
      }
      this.downloadText(filename, this.rows2csv(rows))
    }
  }
}

export default Mfile
