/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'tag-pair',
    ruleOptions = {};

ruleOptions[ruldId] = true;
ruleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('No end tag should result in an error', function(){
        var code = '<!DOCTYPE HTML>\n'+
                    '<html>\n'+
                    '<head>\n'+
                    '   <meta charset="UTF-8">\n'+
                    '   <title>HTMLHint</title>\n'+
                    '</head>\n'+
                    '<body>\n'+
                    '    <div>HTMLHint: help your html code better\n'+
                    '</span>\n' +
                    '</body>\n'+
                    '</html>';
        var messages = HTMLHint.verify(code,ruleOptions);
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(9);
        expect(messages[0].col).to.be(1);

        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(8);
        expect(messages[1].col).to.be(5);
    });

    it('No start tag should result in an error', function(){
        var code = '<span>\n' +
                    ' </div>';
        var messages = HTMLHint.verify(code,ruleOptions);
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(2);
        expect(messages[0].col).to.be(2);

        expect(messages[1].line).to.be(1);
        expect(messages[1].col).to.be(1);
    });

    it('Tag be paired should not result in an error', function(){
        var code = '<p>aaa</p>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
