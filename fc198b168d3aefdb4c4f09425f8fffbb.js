var _typeof = require("@babel/runtime/helpers/typeof");

ace.define("ace/snippets/makefile", ["require", "exports", "module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = "snippet ifeq\n\
	ifeq (${1:cond0},${2:cond1})\n\
		${3:code}\n\
	endif\n\
";
  exports.scope = "makefile";
});

(function () {
  ace.require(["ace/snippets/makefile"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();