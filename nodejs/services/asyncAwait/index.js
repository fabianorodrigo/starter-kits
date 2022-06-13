module.exports = {
  /**
   * @returns retorna o Objeto tendo r como -1 sem esperar pelo fim da promise
   */
  funcaoSincronaChamandoPromises: function () {
    let r = -1;
    funcaoPromises("0").then((x) => {
      r = x;
    });
    return {resultado: "funcaoSincronaChamandoPromises", r};
  },
  /**
   * @returns retorna o Objeto tendo r como -1 sem dar tempo de executar
   * o then da Promise retornada pela função async
   */
  funcaoSincronaChamandoAsync: function () {
    let r = -1;
    funcaoAssincrona(1).then((x) => {
      r = x;
    });
    return {resultado: "funcaoSincronaChamandoAsync", r};
  },

  /**
   * @returns retorna o Objeto tendo r como "ok.2", o await fez esperar pelo fim da
   * Promise retornada pela função async
   */
  funcaoAssincronaChamandoPromisesComAwait: async function () {
    const r = await funcaoPromises(2);
    return {resultado: "funcaoAssincronaChamandoPromisesComAwait", r};
  },
  /**
   * @returns retorna o Objeto tendo r como a Promise retornada pela função async
   */
  funcaoAssincronaChamandoPromisesSemAwait: async function () {
    const r = funcaoPromises(3);
    return {resultado: "funcaoAssincronaChamandoPromisesSemAwait", r};
  },
  /**
   * @returns retorna o Objeto tendo r como uma Promise retornada pela função async
   */
  funcaoAssincronaChamandoAsyncComAwait: async function () {
    const r = await funcaoAssincrona(4);
    return {resultado: "funcaoAssincronaChamandoAsyncComAwait", r};
  },

  /**
   * @returns retorna o Objeto tendo r como uma Promise retornada pela função async
   */
  funcaoAssincronaChamandoAsyncSemAwait: async function () {
    const r = funcaoAssincrona(5);
    return {resultado: "funcaoAssincronaChamandoAsyncSemAwait", r};
  },
};

function funcaoPromises(index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`ok.${index}`);
    }, 1000);
  });
}

async function funcaoAssincrona(valor) {
  return valor;
}
