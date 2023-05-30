/**
 * @customfunction
 **/
function ImportDirectTreasureIpcaJSON() {
  var url = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";
  var jsondata = UrlFetchApp.fetch(url);
  var object   = JSON.parse(jsondata.getContentText());

  var titulosList = object.response.TrsrBdTradgList;
  var ipcas = titulosList.reduce((ipcaListAcumulator, titulo) => {
    if (titulo.TrsrBdType.nm === 'NTNB PRINC' && titulo.TrsrBd.anulInvstmtRate !== 0) {
        ipcaListAcumulator.push({
          expireDate: titulo.TrsrBd.mtrtyDt,
          rate: titulo.TrsrBd.anulInvstmtRate
        });
    }
    return ipcaListAcumulator;
  }, []);

  ipcas.sort((a,b) => (a.expireDate > b.expireDate) ? -1 : ((b.expireDate > a.expireDate) ? 1 : 0))

  return ipcas[0].rate.toString().replace('.',',');
}

/**
 * @customfunction
 **/
function ImportDirectTreasurePreFixadoJSON() {
  var url = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";
  var jsondata = UrlFetchApp.fetch(url);
  var object   = JSON.parse(jsondata.getContentText());

  var titulosList = object.response.TrsrBdTradgList;
  var prefixados = titulosList.reduce((preFixadosListAcumulator, titulo) => {
    if (titulo.TrsrBdType.nm === 'NTN-F' && titulo.TrsrBd.anulInvstmtRate !== 0) {
        preFixadosListAcumulator.push({
          expireDate: titulo.TrsrBd.mtrtyDt,
          rate: titulo.TrsrBd.anulInvstmtRate
        });
    }
    return preFixadosListAcumulator;
  }, []);

  prefixados.sort((a,b) => (a.expireDate > b.expireDate) ? -1 : ((b.expireDate > a.expireDate) ? 1 : 0))

  return prefixados[0].rate.toString().replace('.',',');
}
