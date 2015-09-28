/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'tag-pair',
    description: 'Tag must be paired.',
    init: function(parser, reporter){
        var self = this;
        var stack=[],
            mapEmptyTags = parser.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");//HTML 4.01
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase();
            if (mapEmptyTags[tagName] === undefined && !event.close){
                stack.push({
                    tagName:tagName,
                    line:event.line,
                    col:event.col
                });
            }
        });
        parser.addListener('tagend', function(event){
            var tagName = event.tagName.toLowerCase();
            //向上寻找匹配的开始标签
            var pos;
            for(pos = stack.length-1;pos >= 0; pos--){
                if(stack[pos] && stack[pos].tagName === tagName){
                    break;
                }
            }
            if(pos >= 0){
                for(var i=stack.length-1;i>pos;i--){
                    reporter.error('Tag must be paired, missing: [ </'+ stack[i].tagName + '> ]', stack[i].line, stack[i].col, self, stack[i].raw);
                }
                stack.length=pos;
            }else{
                reporter.error('Tag must be paired, no start tag: [ <' + event.tagName + '> ]', event.line, event.col, self, event.raw);
            }
        });
        parser.addListener('end', function(){
            for(var i=stack.length-1;i>=0;i--){
                reporter.error('Tag must be paired, missing: [ </'+ stack[i].tagName + '> ]', stack[i].line, stack[i].col, self, '');
            }
        });
    }
});


