/**
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'link-rel-require',
    description: 'link tag must have a rel attribute.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrsMap = parser.getMapAttrs(event.attrs);

            if(event.tagName === 'link' && (!('rel' in attrsMap) || !attrsMap['rel'])){
                reporter.warn('link tag must have a rel attribute.',event.line,event.col,self,event.raw);
            }
        });
    }
});