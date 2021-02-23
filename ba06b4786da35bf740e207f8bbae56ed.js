var _typeof = require("@babel/runtime/helpers/typeof");

ace.define("ace/snippets/fsl", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = undefined;
  exports.scope = "";
});

(function () {
  ace.require(["ace/snippets/fsl"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();