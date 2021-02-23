var _typeof = require("@babel/runtime/helpers/typeof");

ace.define("ace/mode/gitignore_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");

  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var GitignoreHighlightRules = function GitignoreHighlightRules() {
    this.$rules = {
      "start": [{
        token: "comment",
        regex: /^\s*#.*$/
      }, {
        token: "keyword",
        // negated patterns
        regex: /^\s*!.*$/
      }]
    };
    this.normalizeRules();
  };

  GitignoreHighlightRules.metaData = {
    fileTypes: ['gitignore'],
    name: 'Gitignore'
  };
  oop.inherits(GitignoreHighlightRules, TextHighlightRules);
  exports.GitignoreHighlightRules = GitignoreHighlightRules;
});
ace.define("ace/mode/gitignore", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/gitignore_highlight_rules"], function (require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");

  var TextMode = require("./text").Mode;

  var GitignoreHighlightRules = require("./gitignore_highlight_rules").GitignoreHighlightRules;

  var Mode = function Mode() {
    this.HighlightRules = GitignoreHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
  };

  oop.inherits(Mode, TextMode);
  (function () {
    this.lineCommentStart = "#";
    this.$id = "ace/mode/gitignore";
  }).call(Mode.prototype);
  exports.Mode = Mode;
});

(function () {
  ace.require(["ace/mode/gitignore"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();