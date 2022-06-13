module.exports = {
  funcaoSincronaChamandoPromises: function () {
    let r = -1;
    funcaoPromises("0").then((x) => {
      console.log(`funcaoSincronaChamandoPromises.THEN`);
      r = x;
    });
    return {resultado: "funcaoSincronaChamandoPromises", r};
  },
  funcaoSincronaChamandoAsync: function () {
    let r = -1;
    funcaoAssincrona(1).then((x) => {
      console.log(`funcaoSincronaChamandoAsync.THEN`);
      r = x;
    });
    return {resultado: "funcaoSincronaChamandoAsync", r};
  },

  funcaoAssincronaChamandoPromises: async function () {
    const r = await funcaoPromises(2);
    return {resultado: "funcaoAssincronaChamandoPromises", r};
  },

  funcaoAssincronaChamandoAsync: async function () {
    const r = funcaoAssincrona(3);
    return {resultado: "funcaoAssincronaChamandoAsync", r};
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
