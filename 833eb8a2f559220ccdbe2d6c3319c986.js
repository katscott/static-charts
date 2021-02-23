var _typeof = require("@babel/runtime/helpers/typeof");

ace.define("ace/snippets/razor", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = "snippet if\n\
(${1} == ${2}) {\n\
	${3}\n\
}";
  exports.scope = "razor";
});

(function () {
  ace.require(["ace/snippets/razor"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();