/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'attr-lowercase',
    ruleOptions = {};

ruleOptions[ruldId] = true;
ruleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('Not all lowercase attr should result in an error', function(){
        var code = '<p TEST="abc"></p>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(4);
    });

    it('Lowercase attr should not result in an error', function(){
        var code = '<p test="abc"></p>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Set is false not result in an error', function(){
        var code = '                        <p TEST="abc" \n' +
                    '            \n' +
                    '    Class="test" src="asda" \n' +
                    '               \n' +
                    '               id="asd"></p>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(28);
        expect(messages[1].line).to.be(3);
        expect(messages[1].col).to.be(5);
    });
});
