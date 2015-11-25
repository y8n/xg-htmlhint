/**
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'inline-style-disabled',
    description: 'inline style tag is not allowed.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                var attrName = attr.name;
                if(attrName == 'style'){
                    reporter.error('Inline style is not allowed.', attr.line, attr.col, self, attr.raw);
                }
            }
        });
    }
});
