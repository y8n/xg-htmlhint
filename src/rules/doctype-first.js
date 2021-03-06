/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, Yang Jiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
HTMLHint.addRule({
    id: 'doctype-first',
    description: 'Doctype must be declared first.',
    init: function(parser,reporter){
        var self = this;
        var allEvent = function(event){
            if(event.type === 'start' || (event.type === 'text' && /^\s*$/.test(event.raw))){
                return;
            }
            if(event.type !== 'comment' || event.long || !/^DOCTYPE\s+/i.test(event.content)){
                reporter.error('Doctype must be declared first.', event.line, event.col, self, event.raw);
            }
            if(event.type === 'comment' && !event.long && /^doctype\s+/.test(event.content)){
                reporter.warn('Doctype must be uppercase.', event.line, event.col, self, event.raw);
            }
            parser.removeListener('all', allEvent);
        };
        parser.addListener('all', allEvent);
    }
});