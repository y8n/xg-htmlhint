/**
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'img-size',
    description: 'Suggest have height and width attributes on img tags.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName === 'img'){
                var attrsMap = parser.getMapAttrs(event.attrs);
                var hasHeight  = (function () {
                    return 'height' in attrsMap && attrsMap['height'];
                })();
                var hasWidth  = (function () {
                    return 'width' in attrsMap && attrsMap['width'];
                })();
                if(!hasHeight || !hasWidth){
                    reporter.info('Suggest have height and width attributes on img tags.',event.line,event.col,self,event.raw);
                }
            }
        });
    }
});