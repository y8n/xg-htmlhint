/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'tag-self-close',
    ruleOptions = {};

ruleOptions[ruldId] = true;
ruleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('The empty tag no closed should not result in an error', function(){
        var code = '<br><img src="test.jpg">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Closed empty tag should not result in an info', function(){
        var code = '<br /><img src="a.jpg"/><div></div>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);

        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('info');

        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(1);
        expect(messages[1].col).to.be(7);
        expect(messages[1].type).to.be('info');
    });

});
