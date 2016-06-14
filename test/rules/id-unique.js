/**
 * Copyright (c) 2015, YangJiyuan <YJY972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'id-unique',
    ruleOptions = {};

ruleOptions[ruldId] = true;
ruleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('The same id or name should result in an error', function(){
        var code = '<div id="test"></div><div id="test"></div><input type="text" name="username"/>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(27);
        expect(messages[0].type).to.be('error');
    });

    it('The same name should not result in an error', function(){
        var code = '<div id="test"></div><input type="password" name="username"/><input type="text"\n' +
                    ' name="username"/>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('The same id with name should not result in an error', function(){
        var code = '<div id="username">\n' +
                    '       <input type="password" name="username"/>\n' +
                    '        <input type="text" name="username"/>\n' +
                    '</div>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('different id or name should not result in an error', function(){
        var code = '<div id="test1"></div><div id="test2"></div><input type="text" name="username"/> <input type="password" name="password"/>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
