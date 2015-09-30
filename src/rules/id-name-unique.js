/**
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'id-name-unique',
    description: 'The value of id/name attributes must be unique.',
    init: function(parser, reporter){
        var self = this;
        var mapAttrName = {};
        parser.addListener('tagstart', function(event){
            var attrs = event.attrs,
                attr,
                attrName;
            for(var i=0, l=attrs.length;i<l;i++){
                attr = attrs[i];
                attrName = attr.name.toLowerCase();
                if(attrName === 'id' || 'name' === attrName){
                    if(attr.value && attr.value.trim()){
                        if(mapAttrName[attr.value]){
                            mapAttrName[attr.value].push(attr);
                        }else{
                            mapAttrName[attr.value] = [attr];
                        }
                    }
                }
            }
        });
        parser.addListener('end', function () {
            var ii,attrArr,len;
            for(ii in mapAttrName){
                attrArr = mapAttrName[ii];
                len = attrArr.length;
                if(len>1){
                    for(var j= 1;j<len;j++){
                        reporter.error('There is a attribute ['+attrArr[0].name+'] has the same value in line:'+attrArr[0].line+',col:'+attrArr[0].col+'.', attrArr[j].line, attrArr[j].col, self, attrArr[j].raw);
                    }
                }
            }
        });
    }
});