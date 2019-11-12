define("ace/mode/ada_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=function(){var e="abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|body|private|then|if|procedure|type|case|in|protected|constant|interface|until||is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor",t="true|false|null",n="count|min|max|avg|sum|rank|now|coalesce|main",i=this.createKeywordMapper({"support.function":n,keyword:e,"constant.language":t},"identifier",!0);this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:i,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]}};n.inherits(o,i),t.AdaHighlightRules=o}),define("ace/mode/ada",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ada_highlight_rules","ace/range"],function(e,t){"use strict";var n=e("../lib/oop"),i=e("./text").Mode,o=e("./ada_highlight_rules").AdaHighlightRules,a=e("../range").Range,r=function(){this.HighlightRules=o,this.$behaviour=this.$defaultBehaviour};n.inherits(r,i),function(){this.lineCommentStart="--",this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e).tokens;if(o.length&&"comment"==o[o.length-1].type)return i;"start"==e&&(t.match(/^.*(begin|loop|then|is|do)\s*$/)&&(i+=n));return i},this.checkOutdent=function(e,t,n){return!!(t+n).match(/^\s*(begin|end)$/)},this.autoOutdent=function(e,t,n){var i=t.getLine(n),o=t.getLine(n-1),r=this.$getIndent(o).length;this.$getIndent(i).length<=r||t.outdentRows(new a(n,0,n+2,0))},this.$id="ace/mode/ada"}.call(r.prototype),t.Mode=r}),window.require(["ace/mode/ada"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});