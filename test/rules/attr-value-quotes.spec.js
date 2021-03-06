/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'attr-value-quotes',
    ruleDoubleOptions = {},
    ruleSingleOptions = {};

ruleDoubleOptions[ruldId] = 'double';
ruleSingleOptions[ruldId] = 'single';
ruleDoubleOptions["doctype-first"] = false;
ruleSingleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('Attribute value closed by single quotes should result in an error', function(){
        var code = "<a     href='abc' \n       title=abc style=''></a>";
        var messages = HTMLHint.verify(code, ruleDoubleOptions);
        expect(messages.length).to.be(3);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(8);

        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(2);
        expect(messages[1].col).to.be(8);

        expect(messages[2].rule.id).to.be(ruldId);
        expect(messages[2].line).to.be(2);
        expect(messages[2].col).to.be(18);
    });

    it('Attribute value no closed should not result in an error', function(){
        var code = '<input type="button" disabled style="">';
        var messages = HTMLHint.verify(code, ruleDoubleOptions);
        expect(messages.length).to.be(0);
    });

    it('Attribute value closed by double quotes should result in an error', function(){
        var code = '<a     href="abc" \n       title=abc style=""></a>';
        var messages = HTMLHint.verify(code, ruleSingleOptions);
        expect(messages.length).to.be(3);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(8);

        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(2);
        expect(messages[1].col).to.be(8);

        expect(messages[2].rule.id).to.be(ruldId);
        expect(messages[2].line).to.be(2);
        expect(messages[2].col).to.be(18);
    });

    it('Attribute value no closed should not result in an error', function(){
        var code = "<input type='button' disabled style=''>";
        var messages = HTMLHint.verify(code, ruleSingleOptions);
        expect(messages.length).to.be(0);
    });

});
