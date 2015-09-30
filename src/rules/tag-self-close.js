/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'tag-self-close',
    description: 'Empty tags must be self closed.',
    init: function(parser, reporter){
        var self = this;
        var mapEmptyTags = parser.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");//HTML 4.01
        parser.addListener('tagstart', function(event){
            var tagName = event.tagName.toLowerCase();
            if(mapEmptyTags[tagName] !== undefined){
                if(event.close.trim() === '/'){
                    reporter.info('There is no need to close tag ['+tagName+'].', event.line, event.col, self, event.raw);
                }
            }
        });
    }
});