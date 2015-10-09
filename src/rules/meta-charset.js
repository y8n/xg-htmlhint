/**
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'meta-charset',
    description: 'The meta tag must has charset attr.',
    init: function(parser,reporter){
        var self = this,
            hasMetaTag = false,
            metaHasCharset = false;
        var tagName,attrs,attr,firstMeta,headBegin;

        var onTagStart = function (event) {
            tagName = event.tagName.toLowerCase();
            if(tagName.toLowerCase() === 'head'){
                headBegin = event;
            }
            if(tagName === 'meta' && !metaHasCharset){
                hasMetaTag = true;
                if(!firstMeta){
                    firstMeta = event;
                }
                attrs = event.attrs;
                var len=attrs.length, i,j;

                for(i=0;i<len;i++){
                    attr = attrs[i];
                    if(attr.name.toLowerCase() === 'charset' && attr.value){
                        metaHasCharset = true;
                        break;
                    }
                }
                if(metaHasCharset){
                    return;
                }
                for(i=0;i<len;i++){
                    attr = attrs[i];
                    if(attr.name.toLowerCase() === 'http-equiv' && attr.value.toLowerCase() === 'charset'){
                        for(j=0;j<len;j++){
                            attr = attrs[j];
                            if(attr.name.toLowerCase() === 'content' && attr.value){
                                metaHasCharset = true;
                                break;
                            }
                        }
                        if(metaHasCharset){
                            break;
                        }
                    }
                }
                if(metaHasCharset){
                    return;
                }
                for(i=0;i<len;i++){
                    attr = attrs[i];
                    if(attr.name.toLowerCase() === 'http-equiv' && attr.value.toLowerCase() === 'content-type'){
                        for(j=0;j<len;j++){
                            attr = attrs[j];
                            if(attr.name.toLowerCase() === 'content' && /;?\s*?charset=/.test(attr.value)){
                                metaHasCharset = true;
                                break;
                            }
                        }
                        if(metaHasCharset){
                            break;
                        }
                    }
                }
            }
        };
        var onHeadEnd = function (event) {
            tagName = event.tagName.toLowerCase();
            if(tagName === 'head'){
                if(!hasMetaTag && headBegin){
                    reporter.error('There must have a meta tag with "charset" attribute present in head tag.', headBegin.line, headBegin.col, self, headBegin.raw);
                }else if(!metaHasCharset){
                    reporter.error('You must specify a charset attribute on meta tag.', firstMeta.line, firstMeta.col, self, firstMeta.raw);
                }

                parser.removeListener('tagstart',onTagStart);
                parser.removeListener('tagend',onHeadEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onHeadEnd);
    }
});