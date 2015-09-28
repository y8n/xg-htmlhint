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

        var checkTitle = function (event) {
            var tagName = event.tagName.toLowerCase();

            if(tagName === 'head'){
                headBegin = true;
            }
            if(tagName === 'title' && headBegin){
                hasTitle = true;
            }
        };

        parser.addListener('tagstart', checkTitle);
        parser.addListener('tagend', function(event){
            var tagName = event.tagName.toLowerCase();

            if(tagName === 'head' && !hasTitle){
                reporter.error('There must be a title tag in head tag.', event.line, event.col, self, event.raw);
            }
            parser.removeListener('tagstart',checkTitle);
        });
    }
});
