define("ace/mode/batchfile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,n=function(){this.$rules={start:[{token:"keyword.command.dosbatch",regex:"\\b(?:append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|copy|date|del|dir|diskcomp|diskcopy|doskey|echo|endlocal|erase|fc|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|popd|print|prompt|pushd|rd|recover|ren|rename|replace|restore|rmdir|set|setlocal|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|xcopy)\\b",caseInsensitive:!0},{token:"keyword.control.statement.dosbatch",regex:"\\b(?:goto|call|exit)\\b",caseInsensitive:!0},{token:"keyword.control.conditional.if.dosbatch",regex:"\\bif\\s+not\\s+(?:exist|defined|errorlevel|cmdextversion)\\b",caseInsensitive:!0},{token:"keyword.control.conditional.dosbatch",regex:"\\b(?:if|else)\\b",caseInsensitive:!0},{token:"keyword.control.repeat.dosbatch",regex:"\\bfor\\b",caseInsensitive:!0},{token:"keyword.operator.dosbatch",regex:"\\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\\b"},{token:["doc.comment","comment"],regex:"(?:^|\\b)(rem)($|\\s.*$)",caseInsensitive:!0},{token:"comment.line.colons.dosbatch",regex:"::.*$"},{include:"variable"},{token:"punctuation.definition.string.begin.shell",regex:'"',push:[{token:"punctuation.definition.string.end.shell",regex:'"',next:"pop"},{include:"variable"},{defaultToken:"string.quoted.double.dosbatch"}]},{token:"keyword.operator.pipe.dosbatch",regex:"[|]"},{token:"keyword.operator.redirect.shell",regex:"&>|\\d*>&\\d*|\\d*(?:>>|>|<)|\\d*<&|\\d*<>"}],variable:[{token:"constant.numeric",regex:"%%\\w+|%[*\\d]|%\\w+%"},{token:"constant.numeric",regex:"%~\\d+"},{token:["markup.list","constant.other","markup.list"],regex:"(%)(\\w+)(%?)"}]},this.normalizeRules()};n.metaData={name:"Batch File",scopeName:"source.dosbatch",fileTypes:["bat"]},o.inherits(n,i),t.BatchFileHighlightRules=n}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var o=e("../../lib/oop"),d=e("../../range").Range,i=e("./fold_mode").FoldMode,n=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};o.inherits(n,i),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,o){var i=e.getLine(o);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";var n=this._getFoldWidgetBase(e,t,o);return!n&&this.startRegionRe.test(i)?"start":n},this.getFoldWidgetRange=function(e,t,o,i){var n,r=e.getLine(o);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,o);if(n=r.match(this.foldingStartMarker)){var s=n.index;if(n[1])return this.openingBracketBlock(e,n[1],o,s);var a=e.getCommentFoldRange(o,s+n[0].length,1);return a&&!a.isMultiLine()&&(i?a=this.getSectionRange(e,o):"all"!=t&&(a=null)),a}if("markbegin"!==t&&(n=r.match(this.foldingStopMarker))){s=n.index+n[0].length;return n[1]?this.closingBracketBlock(e,n[1],o,s):e.getCommentFoldRange(o,s,-1)}},this.getSectionRange=function(e,t){for(var o=e.getLine(t),i=o.search(/\S/),n=t,r=o.length,s=t+=1,a=e.getLength();++t<a;){var l=(o=e.getLine(t)).search(/\S/);if(-1!==l){if(l<i)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=n)break;if(c.isMultiLine())t=c.end.row;else if(i==l)break}s=t}}return new d(n,r,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,o){for(var i=t.search(/\s*$/),n=e.getLength(),r=o,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;++o<n;){t=e.getLine(o);var l=s.exec(t);if(l&&(l[1]?a--:a++,!a))break}if(r<o)return new d(r,i,o,t.length)}}.call(n.prototype)}),define("ace/mode/batchfile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/batchfile_highlight_rules","ace/mode/folding/cstyle"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text").Mode,n=e("./batchfile_highlight_rules").BatchFileHighlightRules,r=e("./folding/cstyle").FoldMode,s=function(){this.HighlightRules=n,this.foldingRules=new r,this.$behaviour=this.$defaultBehaviour};o.inherits(s,i),function(){this.lineCommentStart="::",this.blockComment="",this.$id="ace/mode/batchfile"}.call(s.prototype),t.Mode=s}),window.require(["ace/mode/batchfile"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});