/**
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'button-type-require',
    description: 'button tag must have a type attribute.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrsMap = parser.getMapAttrs(event.attrs);

            if(event.tagName === 'button' && (!('type' in attrsMap) || !attrsMap['type'])){
                reporter.warn('button tag must have a type attribute.',event.line,event.col,self,event.raw);
            }
        });
    }
});