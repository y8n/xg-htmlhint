/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-value-quotes',
    description: 'Attribute values must be in double quotes.',
    init: function(parser, reporter,option){
        var self = this;
        var quotesMap = {
            double:'"',
            single:"'"
        };
        if(!(option in quotesMap)) {
            option = 'double';
        }
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if((attr.value !== '' && attr.quote !== quotesMap[option]) ||
                    (attr.value === '' && attr.quote && attr.quote !== quotesMap[option])){
                    reporter.error('The value of attribute [ '+attr.name+' ] must be in '+option+' quotes.', attr.line, attr.col, self, attr.raw);
                }
            }
        });
    }
});