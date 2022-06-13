const colors = require("colors");
// The fs/promises API provides asynchronous file system methods that return promises.
//const fs = require("node:fs/promises");
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
};
