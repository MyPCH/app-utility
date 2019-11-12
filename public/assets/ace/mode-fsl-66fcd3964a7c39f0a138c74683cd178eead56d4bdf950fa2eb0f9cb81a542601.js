define("ace/mode/fsl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var n=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"punctuation.definition.comment.mn",regex:/\/\*/,push:[{token:"punctuation.definition.comment.mn",regex:/\*\//,next:"pop"},{defaultToken:"comment.block.fsl"}]},{token:"comment.line.fsl",regex:/\/\//,push:[{token:"comment.line.fsl",regex:/$/,next:"pop"},{defaultToken:"comment.line.fsl"}]},{token:"entity.name.function",regex:/\${/,push:[{token:"entity.name.function",regex:/}/,next:"pop"},{defaultToken:"keyword.other"}],comment:"js outcalls"},{token:"constant.numeric",regex:/[0-9]*\.[0-9]*\.[0-9]*/,comment:"semver"},{token:"constant.language.fslLanguage",regex:"(?:graph_layout|machine_name|machine_author|machine_license|machine_comment|machine_language|machine_version|machine_reference|npm_name|graph_layout|on_init|on_halt|on_end|on_terminate|on_finalize|on_transition|on_action|on_stochastic_action|on_legal|on_main|on_forced|on_validation|on_validation_failure|on_transition_refused|on_forced_transition_refused|on_action_refused|on_enter|on_exit|start_states|end_states|terminal_states|final_states|fsl_version)\\s*:"},{token:"keyword.control.transition.fslArrow",regex:/<->|<-|->|<=>|=>|<=|<~>|~>|<~|<-=>|<=->|<-~>|<~->|<=~>|<~=>/},{token:"constant.numeric.fslProbability",regex:/[0-9]+%/,comment:"edge probability annotation"},{token:"constant.character.fslAction",regex:/\'[^']*\'/,comment:"action annotation"},{token:"string.quoted.double.fslLabel.doublequoted",regex:/\"[^"]*\"/,comment:"fsl label annotation"},{token:"entity.name.tag.fslLabel.atom",regex:/[a-zA-Z0-9_.+&()#@!?,]/,comment:"fsl label annotation"}]},this.normalizeRules()};i.metaData={fileTypes:["fsl","fsl_state"],name:"FSL",scopeName:"source.fsl"},n.inherits(i,o),t.FSLHighlightRules=i}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var n=e("../../lib/oop"),c=e("../../range").Range,o=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(i,o),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o=e.getLine(n);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var i=this._getFoldWidgetBase(e,t,n);return!i&&this.startRegionRe.test(o)?"start":i},this.getFoldWidgetRange=function(e,t,n,o){var i,a=e.getLine(n);if(this.startRegionRe.test(a))return this.getCommentRegionBlock(e,a,n);if(i=a.match(this.foldingStartMarker)){var r=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,r);var s=e.getCommentFoldRange(n,r+i[0].length,1);return s&&!s.isMultiLine()&&(o?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t&&(i=a.match(this.foldingStopMarker))){r=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,r):e.getCommentFoldRange(n,r,-1)}},this.getSectionRange=function(e,t){for(var n=e.getLine(t),o=n.search(/\S/),i=t,a=n.length,r=t+=1,s=e.getLength();++t<s;){var l=(n=e.getLine(t)).search(/\S/);if(-1!==l){if(l<o)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=i)break;if(g.isMultiLine())t=g.end.row;else if(o==l)break}r=t}}return new c(i,a,r,e.getLine(r).length)},this.getCommentRegionBlock=function(e,t,n){for(var o=t.search(/\s*$/),i=e.getLength(),a=n,r=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,s=1;++n<i;){t=e.getLine(n);var l=r.exec(t);if(l&&(l[1]?s--:s++,!s))break}if(a<n)return new c(a,o,n,t.length)}}.call(i.prototype)}),define("ace/mode/fsl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/fsl_highlight_rules","ace/mode/folding/cstyle"],function(e,t){"use strict";var n=e("../lib/oop"),o=e("./text").Mode,i=e("./fsl_highlight_rules").FSLHighlightRules,a=e("./folding/cstyle").FoldMode,r=function(){this.HighlightRules=i,this.foldingRules=new a};n.inherits(r,o),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/fsl"}.call(r.prototype),t.Mode=r}),window.require(["ace/mode/fsl"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});