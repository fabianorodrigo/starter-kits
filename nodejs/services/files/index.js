const colors = require("colors");
// The fs/promises API provides asynchronous file system methods that return promises.
const fsPromises = require("node:fs/promises");
const fs = require("fs");

module.exports = {
  sync: {
    mkdir: function (path, recursivo = true) {
      return fs.mkdirSync(path, {recursive: recursivo});
    },
    rmdir: function (path, recursivo = true) {
      return fs.rmdirSync(path, {recursive: recursivo});
    },
    createFile: function (path, content) {
      return fs.writeFileSync(path, content);
    },
    canRead: function (path) {
      try {
        fs.accessSync(path, fs.constants.R_OK);
        return true;
      } catch (e) {
        return false;
      }
    },
    canWrite: function (path) {
      try {
        fs.accessSync(path, fs.constants.W_OK);
        return true;
      } catch (e) {
        return false;
      }
    },
    openFile: function (path, data, flags = "r") {
      const fd = fs.openSync(path, flags);
      try {
        if (!data || data == "") {
          fs.readFileSync(fd);
        } else {
          fs.writeFileSync(fd, data);
          return colors.blue(
            `File content: "${fs.readFileSync(path).toString()}"`
          );
        }
        //console.log(`File content: ${fs.readFileSync(fd)}`);
      } finally {
        fs.closeSync(fd);
      }
    },
    appendFile: function (path, additionalContent) {
      fs.appendFileSync(path, additionalContent);
      // outra forma de fazer o mesmo
      const fd = fs.openSync(path, "a"); //FLAG 'a': Open file for appending. The file is created if it does not exist. ('ax' is equivalent to 'a' but fails if the path exists).
      try {
        fs.appendFileSync(fd, additionalContent);
      } finally {
        fs.closeSync(fd);
      }
      return true;
    },
    listDirFiles: function (path) {
      return fs.readdirSync(path);
    },
    readFile: function (path) {
      return fs.readFileSync(path).toString();
    },
    resolvePath: function (path) {
      return fs.realpathSync(path);
    },
    renameFile: function (oldPath, newPath) {
      return fs.renameSync(oldPath, newPath);
    },
    stats: function (path) {
      return fs.statSync(path);
    },
    deleteFile: function (path) {
      return fs.unlinkSync(path);
    },
  },
  async: {
    mkdir: function (path, recursivo = true) {
      return fsPromises.mkdir(path, {recursive: recursivo});
    },
    rmdir: function (path, recursivo = true) {
      return fsPromises.rm(path, {recursive: recursivo});
    },
    createFile: function (path, content) {
      return fsPromises.writeFile(path, content);
    },
    canRead: async function (path) {
      try {
        await fsPromises.access(path, fs.constants.R_OK);
        return true;
      } catch (e) {
        return false;
      }
    },
    canWrite: async function (path) {
      try {
        await fsPromises.access(path, fs.constants.W_OK);
        return true;
      } catch (e) {
        return false;
      }
    },
    openFile: async function (path, data, flags = "r") {
      const fd = await fsPromises.open(path, flags);
      try {
        if (!data || data == "") {
          await fsPromises.readFile(fd);
        } else {
          await fsPromises.writeFile(fd, data);
          const content = await fsPromises.readFile(path);
          return colors.blue(`File content: "${content}"`);
        }
        //console.log(`File content: ${fs.readFileSync(fd)}`);
      } finally {
        await fd.close();
      }
    },
    appendFile: async function (path, additionalContent) {
      await fsPromises.appendFile(path, additionalContent);
      // outra forma de fazer o mesmo
      const fd = await fsPromises.open(path, "a"); //FLAG 'a': Open file for appending. The file is created if it does not exist. ('ax' is equivalent to 'a' but fails if the path exists).
      try {
        await fsPromises.appendFile(fd, additionalContent);
      } finally {
        await fd.close();
      }
      return true;
    },
    listDirFiles: async function (path) {
      return await fsPromises.readdir(path);
    },
    readFile: async function (path) {
      return (await fsPromises.readFile(path)).toString();
    },
    resolvePath: async function (path) {
      return await fsPromises.realpath(path);
    },
    renameFile: async function (oldPath, newPath) {
      return await fsPromises.rename(oldPath, newPath);
    },
    stats: async function (path) {
      return await fsPromises.stat(path);
    },
    deleteFile: async function (path) {
      return await fsPromises.unlink(path);
    },
  },
};
