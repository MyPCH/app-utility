define("ace/mode/fsharp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,r=function(){var e=this.createKeywordMapper({variable:"this",keyword:"abstract|assert|base|begin|class|default|delegate|done|downcast|downto|elif|else|exception|extern|false|finally|function|global|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|open|or|override|private|public|rec|return|return!|select|static|struct|then|to|true|try|typeof|upcast|use|use!|val|void|when|while|with|yield|yield!|__SOURCE_DIRECTORY__|as|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile|and|do|end|for|fun|if|in|let|let!|new|not|null|of|endif",constant:"true|false"},"identifier"),t="(?:(?:(?:(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.))|(?:\\d+))(?:[eE][+-]?\\d+))|(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.)))";this.$rules={start:[{token:"variable.classes",regex:"\\[\\<[.]*\\>\\]"},{token:"comment",regex:"//.*$"},{token:"comment.start",regex:/\(\*(?!\))/,push:"blockComment"},{token:"string",regex:"'.'"},{token:"string",regex:'"""',next:[{token:"constant.language.escape",regex:/\\./,next:"qqstring"},{token:"string",regex:'"""',next:"start"},{defaultToken:"string"}]},{token:"string",regex:'"',next:[{token:"constant.language.escape",regex:/\\./,next:"qqstring"},{token:"string",regex:'"',next:"start"},{defaultToken:"string"}]},{token:["verbatim.string","string"],regex:'(@?)(")',stateName:"qqstring",next:[{token:"constant.language.escape",regex:'""'},{token:"string",regex:'"',next:"start"},{defaultToken:"string"}]},{token:"constant.float",regex:"(?:"+t+"|\\d+)[jJ]\\b"},{token:"constant.float",regex:t},{token:"constant.integer",regex:"(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[oO]?[0-7]+)|(?:0[xX][\\dA-Fa-f]+)|(?:0[bB][01]+))\\b"},{token:["keyword.type","variable"],regex:"(type\\s)([a-zA-Z0-9_$-]*\\b)"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|=|\\(\\*\\)"},{token:"paren.lpar",regex:"[[({]"},{token:"paren.rpar",regex:"[\\])}]"}],blockComment:[{regex:/\(\*\)/,token:"comment"},{regex:/\(\*(?!\))/,token:"comment.start",push:"blockComment"},{regex:/\*\)/,token:"comment.end",next:"pop"},{defaultToken:"comment"}]},this.normalizeRules()};n.inherits(r,o),t.FSharpHighlightRules=r}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),c=e("../../range").Range,o=e("./fold_mode").FoldMode,r=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(r,o),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o=e.getLine(n);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var r=this._getFoldWidgetBase(e,t,n);return!r&&this.startRegionRe.test(o)?"start":r},this.getFoldWidgetRange=function(e,t,n,o){var r,i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);if(r=i.match(this.foldingStartMarker)){var a=r.index;if(r[1])return this.openingBracketBlock(e,r[1],n,a);var s=e.getCommentFoldRange(n,a+r[0].length,1);return s&&!s.isMultiLine()&&(o?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t&&(r=i.match(this.foldingStopMarker))){a=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],n,a):e.getCommentFoldRange(n,a,-1)}},this.getSectionRange=function(e,t){for(var n=e.getLine(t),o=n.search(/\S/),r=t,i=n.length,a=t+=1,s=e.getLength();++t<s;){var l=(n=e.getLine(t)).search(/\S/);if(-1!==l){if(l<o)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=r)break;if(g.isMultiLine())t=g.end.row;else if(o==l)break}a=t}}return new c(r,i,a,e.getLine(a).length)},this.getCommentRegionBlock=function(e,t,n){for(var o=t.search(/\s*$/),r=e.getLength(),i=n,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,s=1;++n<r;){t=e.getLine(n);var l=a.exec(t);if(l&&(l[1]?s--:s++,!s))break}if(i<n)return new c(i,o,n,t.length)}}.call(r.prototype)}),define("ace/mode/fsharp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/fsharp_highlight_rules","ace/mode/folding/cstyle"],function(e,t){"use strict";var n=e("../lib/oop"),o=e("./text").Mode,r=e("./fsharp_highlight_rules").FSharpHighlightRules,i=e("./folding/cstyle").FoldMode,a=function(){o.call(this),this.HighlightRules=r,this.foldingRules=new i};n.inherits(a,o),function(){this.lineCommentStart="//",this.blockComment={start:"(*",end:"*)",nestable:!0},this.$id="ace/mode/fsharp"}.call(a.prototype),t.Mode=a}),window.require(["ace/mode/fsharp"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});