/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-value-not-empty',
    description: 'All attributes must have values.',
    init: function(parser, reporter){
        var self = this,
            mapEmptyTags = parser.makeMap("noscript,disabled,checked,required,autofocus,selected,nohref,autoplay,controls,muted,loop,preload,open,noresize,seamless,formnovalidate,readonly,declare,async,defer,multiple,readonly,pubdate");//HTML 4.01
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                if(!mapEmptyTags[attr.name] && attr.value === ''){
                    reporter.warn('The attribute [ '+attr.name+' ] must have a value.', attr.line, attr.col, self, attr.raw);
                }
            }
        });
    }
});