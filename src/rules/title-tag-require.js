/**
 * Copyright (c) 2015, Yang Jiyua <yjy972080142@gmail.com>
 * MIT Licensed
 *
 */
HTMLHint.addRule({
    id: 'title-tag-require',
    description: 'There must be a title tag in head tag.',
    init: function(parser, reporter){
        var self = this;
        var hasTitle = false,headBegin = false;

        var onHeadStart = function (event) {
            var tagName = event.tagName.toLowerCase();

            if(tagName === 'head'){
                headBegin = true;
            }
            if(tagName === 'title' && headBegin){
                hasTitle = true;
            }
        };

        var onHeadEnd = function (event) {
            var tagName = event.tagName.toLowerCase();

            if(tagName === 'head'){
                if(!hasTitle){
                    reporter.error('There must be a title tag in head tag.', event.line, event.col, self, event.raw);
                }
                parser.removeListener('tagstart',onHeadStart);
                parser.removeListener('tagend',onHeadEnd);
            }
        };


        parser.addListener('tagstart', onHeadStart);
        parser.addListener('tagend', onHeadEnd);
    }
});
