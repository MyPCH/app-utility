define("ace/mode/c9search_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(e,t){"use strict";function c(e,t){try{return new RegExp(e,t)}catch(n){}}var n=e("../lib/oop"),h=e("../lib/lang"),r=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{tokenNames:["c9searchresults.constant.numeric","c9searchresults.text","c9searchresults.text","c9searchresults.keyword"],regex:/(^\s+[0-9]+)(:)(\d*\s?)([^\r\n]+)/,onMatch:function(e,t,n){var r=this.splitRegex.exec(e),i=this.tokenNames,s=[{type:i[0],value:r[1]},{type:i[1],value:r[2]}];r[3]&&(" "==r[3]?s[1]={type:i[1],value:r[2]+" "}:s.push({type:i[1],value:r[3]}));var o,a=n[1],u=r[4],c=0;if(a&&a.exec)for(a.lastIndex=0;o=a.exec(u);){var h=u.substring(c,o.index);if(c=a.lastIndex,h&&s.push({type:i[2],value:h}),o[0])s.push({type:i[3],value:o[0]});else if(!h)break}return c<u.length&&s.push({type:i[2],value:u.substr(c)}),s}},{regex:"^Searching for [^\\r\\n]*$",onMatch:function(e,t,n){var r,i,s=e.split("\x01");if(s.length<3)return"text";var o=0,a=[{value:s[o++]+"'",type:"text"},{value:i=s[o++],type:"text"},{value:"'"+s[o++],type:"text"}];for(" in"!==s[2]&&(s[o],a.push({value:"'"+s[o++]+"'",type:"text"},{value:s[o++],type:"text"})),a.push({value:" "+s[o++]+" ",type:"text"}),s[o+1]?(r=s[o+1],a.push({value:"("+s[o+1]+")",type:"text"}),o+=1):o-=1;o++<s.length;)s[o]&&a.push({value:s[o],type:"text"});i&&(/regex/.test(r)||(i=h.escapeRegExp(i)),/whole/.test(r)&&(i="\\b"+i+"\\b"));var u=i&&c("("+i+")",/ sensitive/.test(r)?"g":"ig");return u&&(n[0]=t,n[1]=u),a}},{regex:"^(?=Found \\d+ matches)",token:"text",next:"numbers"},{token:"string",regex:"^\\S:?[^:]+",next:"numbers"}],numbers:[{regex:"\\d+",token:"constant.numeric"},{regex:"$",token:"text",next:"start"}]},this.normalizeRules()};n.inherits(i,r),t.C9SearchHighlightRules=i}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var o=e("../range").Range,n=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var r=n[1].length,i=e.findMatchingBracket({row:t,column:r});if(!i||i.row==t)return 0;var s=this.$getIndent(e.getLine(i.row));e.replace(new o(t,0,t,r-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(n.prototype),t.MatchingBraceOutdent=n}),define("ace/mode/folding/c9search",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),d=e("../../range").Range,r=e("./fold_mode").FoldMode,i=t.FoldMode=function(){};n.inherits(i,r),function(){this.foldingStartMarker=/^(\S.*:|Searching for.*)$/,this.foldingStopMarker=/^(\s+|Found.*)$/,this.getFoldWidgetRange=function(e,t,n){var r=e.doc.getAllLines(n),i=r[n],s=/^(Found.*|Searching for.*)$/,o=/^(\S.*:|\s*)$/,a=s.test(i)?s:o,u=n,c=n;if(this.foldingStartMarker.test(i)){for(var h=n+1,l=e.getLength();h<l&&!a.test(r[h]);h++);c=h}else if(this.foldingStopMarker.test(i)){for(h=n-1;0<=h&&(i=r[h],!a.test(i));h--);u=h}if(u!=c){var g=i.length;return a===s&&(g=i.search(/\(Found[^)]+\)$|$/)),new d(u,g,c,0)}}}.call(i.prototype)}),define("ace/mode/c9search",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/c9search_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/c9search"],function(e,t){"use strict";var n=e("../lib/oop"),r=e("./text").Mode,i=e("./c9search_highlight_rules").C9SearchHighlightRules,s=e("./matching_brace_outdent").MatchingBraceOutdent,o=e("./folding/c9search").FoldMode,a=function(){this.HighlightRules=i,this.$outdent=new s,this.foldingRules=new o};n.inherits(a,r),function(){this.getNextLineIndent=function(e,t){return this.$getIndent(t)},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/c9search"}.call(a.prototype),t.Mode=a});