const colors = require("colors");
const readlineSync = require("readline-sync");
const ui = require("./ui/main");

const thisUI = require("./ui/this");
const closureUI = require("./ui/closure");
const arraysUI = require("./ui/arrays");
const regexUI = require("./ui/regex");
const fileSystem = require("./ui/fileSystem");
const asyncAwait = require("./ui/asyncAwait");
const buffers = require("./ui/buffers");
const streams = require("./ui/streams");

let menu;
globalThis.name = "I'm globalThis";
this.name = `I'm index.js`;

const application = {
  name: `I'm index.js.Application`,
  run: function () {
    while (menu != "0" && menu != "") {
      //clear screen
      process.stdout.write("\033c");
      //show menu
      console.log(colors.green("NODEJS BOOTSTRAP APP"));
      ui.printBar(colors.green);
      console.log(`
              1. 'this' demo
              2. Closures demo
              3. Arrays demo  
              4. Regex demo    
              5. File System demo (Syncronous API)   
              6. File System demo (Promises API)   
              7. async/await demo  
              8. Buffers
              9. Streams
              0. Exit
              `);
      menu = readlineSync.question("Enter your choice: ".yellow);
      //breakline
      console.log("");
      if (menu != "0") {
        ui.printBar();
      }
      switch (menu) {
        case "1":
          thisUI.show();
          break;
        case "2":
          closureUI.show();
          break;
        case "3":
          arraysUI.show();
          break;
        case "4":
          regexUI.show();
          break;
        case "5":
          fileSystem.showSync();
          break;
        case "6":
          fileSystem.showAsync();
          break;
        case "7":
          asyncAwait.show();
          break;
        case "8":
          buffers.show();
          break;
        case "9":
          streams.show();
          break;
      }

      if (menu != "0") {
        //just a pause to see results
        readlineSync.question();
      }
    }

    console.log(`Bye ...`);
  },
};

application.run();
