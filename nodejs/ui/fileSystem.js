const colors = require("colors");
const readlineSync = require("readline-sync");
const ui = require("./main");
const FS = require("../services/files");

module.exports = {
  showSync: function () {
    //cria diretorio recursivamente
    ui.functionResult(FS.sync.mkdir, "./data/teste/teste", true);
    //cria arquivo
    ui.functionResult(
      FS.sync.createFile,
      "./data/teste/teste/teste.txt",
      "Opa, testando"
    );
    //Checa se o processo tem permissão de leitura
    ui.functionResult(FS.sync.canRead, "./data/teste/teste/teste.txt");
    //Checa se o processo tem permissão de escrita
    ui.functionResult(FS.sync.canWrite, "./data/teste/teste/teste.txt");
    //apenda conteúdo ao arquivo
    ui.functionResult(
      FS.sync.appendFile,
      "./data/teste/teste/teste.txt",
      "\nOpa, testando linha 2"
    );
    //lista arquivos do diretorio
    ui.functionResult(FS.sync.listDirFiles, "./data/teste/teste");
    //lê conteúdo arquivo
    ui.functionResult(FS.sync.readFile, "./data/teste/teste/teste.txt");
    // resolve os "." e ".."
    ui.functionResult(FS.sync.resolvePath, "./../../");
    // renomeia arquivo
    ui.functionResult(
      FS.sync.renameFile,
      "./data/teste/teste/teste.txt",
      "./data/teste/teste/teste2.txt"
    );
    // obtém informações do arquivo
    ui.functionResult(FS.sync.stats, "./data/teste/teste/teste2.txt");
    //apagar arquivo
    ui.functionResult(FS.sync.deleteFile, "./data/teste/teste/teste2.txt");

    console.table(flags);
    console.log("");
    //abrir arquivo inexistente com flag 'a' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagA.txt",
      "\nabrir arquivo inexistente com flag 'a' e escrever: cria o arquivo  e apenda conteúdo",
      "a"
    );
    //abrir arquivo inexistente com flag 'ax' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagAX.txt",
      "\nabrir arquivo inexistente com flag 'ax' e escrever: cria o arquivo e apenda conteúdo",
      "ax"
    );
    //abrir arquivo existente com flag 'ax' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagAX.txt",
      "\nabrir arquivo existente com flag 'ax' e escrever: como o arquivo existe, lança exceção",
      "ax"
    );
    //abrir arquivo inexistente com flag 'a+' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagA+.txt",
      "\nabrir arquivo inexistente com flag 'a+' e escrever: cria o arquivo  e apenda conteúdo",
      "a+"
    );
    //abrir arquivo existente com flag 'a+' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagA+.txt",
      "\nabrir arquivo existente com flag 'a+' e escrever: apenda no arquivo",
      "a+"
    );
    //abrir arquivo inexistente com flag 'r'
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagR.txt",
      "\nabrir arquivo inexistente com flag 'r': lança exceção",
      "r"
    );
    //abrir arquivo inexistente com flag 'r+'
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagR+.txt",
      "\nabrir arquivo inexistente com flag 'r+': lança exceção",
      "r+"
    );
    //abrir arquivo inexistente com flag 'rs+'
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagRS+.txt",
      "\nabrir arquivo inexistente com flag 'rs+': lança exceção",
      "rs+"
    );
    //abrir arquivo inexistente com flag 'w' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagW.txt",
      "\nabrir arquivo inexistente com flag 'w' e escrever: cria o arquivo com conteúdo (aberto somente para escrita)",
      "w"
    );
    //abrir arquivo existente com flag 'w' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagW.txt",
      "\nabrir arquivo existente com flag 'w' e escrever: SOBREESCREVE/TRUNCA o arquivo com conteúdo (aberto somente para escrita)",
      "w"
    );
    //abrir arquivo inexistente com flag 'wx' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagWX.txt",
      "\nabrir arquivo inexistente com flag 'wx' e escrever: cria o arquivo com conteúdo (aberto somente para escrita)",
      "wx"
    );
    //abrir arquivo existente com flag 'wx' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagWX.txt",
      "\nabrir arquivo existente com flag 'wx' e escrever: como o arquivo existe, lança exceção",
      "wx"
    );
    //abrir arquivo inexistente com flag 'w+' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagW+.txt",
      "\nabrir arquivo inexistente com flag 'w+' e escrever: cria o arquivo com conteúdo (aberto pra leitura e escrita)",
      "w+"
    );
    //abrir arquivo existente com flag 'w+' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagW+.txt",
      "\nabrir arquivo existente com flag 'w+' e escrever: SOBRESCREVE/TRUNCA o arquivo (aberto pra leitura e escrita)",
      "w+"
    );
    //abrir arquivo inexistente com flag 'w+' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagWX+.txt",
      "\nabrir arquivo inexistente com flag 'wx+' e escrever: cria o arquivo com conteúdo (aberto pra leitura e escrita)",
      "wx+"
    );
    //abrir arquivo existente com flag 'w+' e escrever
    ui.functionResult(
      FS.sync.openFile,
      "./data/teste/teste/flagWX+.txt",
      "\nabrir arquivo existente com flag 'wx+' e escrever: como o arquivo existe, lança exceção",
      "wx+"
    );

    //apagar diretório recursivamente
    ui.functionResult(FS.sync.rmdir, "./data/teste/");
  },
  showAsync: async function () {
    console.log(
      colors.red(
        `os resultados assíncronos só pode ser observados quando sair do while com o readlineSync [entender isso melhor]`
      )
    );
    //cria diretorio recursivamente
    await ui.functionAsyncResult(FS.async.mkdir, "./data/teste/teste", true);
    //cria arquivo
    await ui.functionAsyncResult(
      FS.async.createFile,
      "./data/teste/teste/teste.txt",
      "Opa, testando"
    );
    //Checa se o processo tem permissão de leitura
    await ui.functionAsyncResult(
      FS.async.canRead,
      "./data/teste/teste/teste.txt"
    );
    //Checa se o processo tem permissão de escrita
    await ui.functionAsyncResult(
      FS.async.canWrite,
      "./data/teste/teste/teste.txt"
    );
    //apenda conteúdo ao arquivo
    await ui.functionAsyncResult(
      FS.async.appendFile,
      "./data/teste/teste/teste.txt",
      "\nOpa, testando linha 2"
    );
    //lista arquivos do diretorio
    await ui.functionAsyncResult(FS.async.listDirFiles, "./data/teste/teste");
    //lê conteúdo arquivo
    ui.functionAsyncResult(FS.async.readFile, "./data/teste/teste/teste.txt");
    // resolve os "." e ".."
    ui.functionAsyncResult(FS.async.resolvePath, "./../../");
    // renomeia arquivo
    ui.functionAsyncResult(
      FS.async.renameFile,
      "./data/teste/teste/teste.txt",
      "./data/teste/teste/teste2.txt"
    );
    // obtém informações do arquivo
    ui.functionAsyncResult(FS.async.stats, "./data/teste/teste/teste2.txt");
    //apagar arquivo
    ui.functionAsyncResult(
      FS.async.deleteFile,
      "./data/teste/teste/teste2.txt"
    );

    console.table(flags);
    console.log("");
    //abrir arquivo inexistente com flag 'a' e escrever
    ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagA.txt",
      "\nabrir arquivo inexistente com flag 'a' e escrever: cria o arquivo  e apenda conteúdo",
      "a"
    );
    //abrir arquivo inexistente com flag 'ax' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagAX.txt",
      "\nabrir arquivo inexistente com flag 'ax' e escrever: cria o arquivo e apenda conteúdo",
      "ax"
    );
    //abrir arquivo existente com flag 'ax' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagAX.txt",
      "\nabrir arquivo existente com flag 'ax' e escrever: como o arquivo existe, lança exceção",
      "ax"
    );
    //abrir arquivo inexistente com flag 'a+' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagA+.txt",
      "\nabrir arquivo inexistente com flag 'a+' e escrever: cria o arquivo  e apenda conteúdo",
      "a+"
    );
    //abrir arquivo existente com flag 'a+' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagA+.txt",
      "\nabrir arquivo existente com flag 'a+' e escrever: apenda no arquivo",
      "a+"
    );
    //abrir arquivo inexistente com flag 'r'
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagR.txt",
      "\nabrir arquivo inexistente com flag 'r': lança exceção",
      "r"
    );
    //abrir arquivo inexistente com flag 'r+'
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagR+.txt",
      "\nabrir arquivo inexistente com flag 'r+': lança exceção",
      "r+"
    );
    //abrir arquivo inexistente com flag 'rs+'
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagRS+.txt",
      "\nabrir arquivo inexistente com flag 'rs+': lança exceção",
      "rs+"
    );
    //abrir arquivo inexistente com flag 'w' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagW.txt",
      "\nabrir arquivo inexistente com flag 'w' e escrever: cria o arquivo com conteúdo (aberto somente para escrita)",
      "w"
    );
    //abrir arquivo existente com flag 'w' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagW.txt",
      "\nabrir arquivo existente com flag 'w' e escrever: SOBREESCREVE/TRUNCA o arquivo com conteúdo (aberto somente para escrita)",
      "w"
    );
    //abrir arquivo inexistente com flag 'wx' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagWX.txt",
      "\nabrir arquivo inexistente com flag 'wx' e escrever: cria o arquivo com conteúdo (aberto somente para escrita)",
      "wx"
    );
    //abrir arquivo existente com flag 'wx' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagWX.txt",
      "\nabrir arquivo existente com flag 'wx' e escrever: como o arquivo existe, lança exceção",
      "wx"
    );
    //abrir arquivo inexistente com flag 'w+' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagW+.txt",
      "\nabrir arquivo inexistente com flag 'w+' e escrever: cria o arquivo com conteúdo (aberto pra leitura e escrita)",
      "w+"
    );
    //abrir arquivo existente com flag 'w+' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagW+.txt",
      "\nabrir arquivo existente com flag 'w+' e escrever: SOBRESCREVE/TRUNCA o arquivo (aberto pra leitura e escrita)",
      "w+"
    );
    //abrir arquivo inexistente com flag 'w+' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagWX+.txt",
      "\nabrir arquivo inexistente com flag 'wx+' e escrever: cria o arquivo com conteúdo (aberto pra leitura e escrita)",
      "wx+"
    );
    //abrir arquivo existente com flag 'w+' e escrever
    await ui.functionAsyncResult(
      FS.async.openFile,
      "./data/teste/teste/flagWX+.txt",
      "\nabrir arquivo existente com flag 'wx+' e escrever: como o arquivo existe, lança exceção",
      "wx+"
    );

    //apagar diretório recursivamente
    await ui.functionAsyncResult(FS.async.rmdir, "./data/teste/");
  },
};

//table with flags
const flags = [];
flags.push({
  flag: "a",
  description:
    "Open file for appending. The file is created if it does not exist",
});
flags.push({
  flag: "ax",
  description: `Like 'a' but fails if the path exists`,
});
flags.push({
  flag: "a+",
  description: `Open file for reading and appending. The file is created if it does not exist`,
});
flags.push({
  flag: "ax+",
  description: `Like 'a+' but fails if the path exists`,
});
flags.push({
  flag: "as",
  description:
    "Open file for appending in synchronous mode. The file is created if it does not exist",
});
flags.push({
  flag: "as+",
  description: `Open file for reading and appending in synchronous mode. The file is created if it does not exist`,
});
flags.push({
  flag: "r",
  description: `Open file for reading. An exception occurs if the file does not exist`,
});
flags.push({
  flag: "r+",
  description: `Open file for reading and writing. An exception occurs if the file does not exist`,
});
flags.push({
  flag: "rs+",
  description: `Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache`,
});
flags.push({
  flag: "w",
  description: `Open file for writing. The file is created (if it does not exist) or truncated (if it exists)`,
});
flags.push({
  flag: "wx",
  description: `Like 'w' but fails if the path exists`,
});
flags.push({
  flag: "w+",
  description: `Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists)`,
});
flags.push({
  flag: "wx+",
  description: `Like 'w+' but fails if the path exists`,
});
