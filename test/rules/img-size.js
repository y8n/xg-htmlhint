/**
 * Copyright (c) 2015, YangJiyuan <YJY972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'img-size',
    ruleOptions = {};

ruleOptions[ruldId] = true;
ruleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('img tag has height and width attr should result in an error.', function(){
        var code = '<img width="200" height="100">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('img tag has not height and width shouled result in an error.', function(){
        var code = '<img>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('info');

        code = '<img width="" height="">';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('info');
    });

    it('img tag has not height shouled result in an error.', function(){
        var code = '<img width="200">\n ' +
                    '<img width="" height="111">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);

        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('info');

        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(2);
        expect(messages[1].col).to.be(2);
        expect(messages[1].type).to.be('info');
    });

    it('img tag has not width shouled result in an error.', function(){
        var code = '<img height="200">\n\n' +
            '<img height="" width="200">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);

        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('info');

        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(3);
        expect(messages[1].col).to.be(1);
        expect(messages[1].type).to.be('info');
    });


});
