/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2014, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'attr-no-duplication',
    description: 'Elements cannot have duplicate attributes.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs;
            var attr;
            var attrName;

            var mapAttrName = {};
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                attrName = attr.name;
                if(mapAttrName[attrName]){
                    mapAttrName[attrName].push(attr);
                }else{
                    mapAttrName[attrName] = [attr];
                }
            }

            var attrArr,ii;
            for(ii in mapAttrName){
                attrArr = mapAttrName[ii];
                if(attrArr.length>1){
                    reporter.error('Duplicate of attribute name [ '+ii+' ] was found.', attrArr[0].line, attrArr[0].col, self, attrArr[0].raw);
                }
            }

        });
    }
});