/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2014, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'attr-no-duplication',
    ruleOptions = {};

ruleOptions[ruldId] = true;
ruleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('Attribute name been duplication should result in an error', function(){
        var code = '<a  href="a" href="b">bbb</a>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(5);
    });

    it('Attribute name not been duplication should not result in an error', function(){
        var code = '<a href="a">bbb</a>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
