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
        var tagName,attrsMap,firstMeta,headBegin;

        var onTagStart = function (event) {
            tagName = event.tagName.toLowerCase();
            if(tagName.toLowerCase() === 'head'){
                headBegin = event;
            }
            if(tagName === 'meta'){
                hasMetaTag = true;
                if(!firstMeta){
                    firstMeta = event;
                }
                attrsMap = parser.getMapAttrs(event.attrs);

                if(
                    ('charset' in attrsMap && attrsMap['charset']) ||
                    ('http-equiv' in attrsMap && attrsMap['http-equiv'] && 'content' in attrsMap &&
                        (
                            (attrsMap['http-equiv'].toLowerCase() === 'charset'  && attrsMap['content']) ||
                            (attrsMap['http-equiv'].toLowerCase() === 'content-type' && /;?\s*?charset=/.test(attrsMap['content']))
                        )
                    )
                ){
                    metaHasCharset = true;
                    parser.removeListener('tagstart',onTagStart);
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