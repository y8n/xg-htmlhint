/**
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'button-type-require',
    ruleOptions = {};

ruleOptions[ruldId] = true;
ruleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('button tag have no type should result an error', function(){
        var code = '<button></button>\n' +
                    ' <button type=""></button>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);

        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(2);
        expect(messages[1].col).to.be(2);
    });

    it('button tag have type should not result in an error', function(){
        var code = '<button type="button"></button>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);

        code = "<button type='button'></button>";
        ruleOptions['attr-value-quotes'] = 'single';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
