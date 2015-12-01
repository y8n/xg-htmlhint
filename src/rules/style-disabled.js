/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'style-disabled',
    description: '<style> tags is not allowed.',
    init: function(parser, reporter){
        var self = this;
        parser.addListener('tagstart', function(event){
            if(event.tagName.toLowerCase() === 'style'){
                reporter.warn('The <style> tag is not allowed.', event.line, event.col, self, event.raw);
            }
        });
    }
});
