/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'csslint',
    ruleOptions = {};

ruleOptions[ruldId] = {
        "display-property-grouping": true,
        "known-properties": true
    };
ruleOptions["doctype-first"] = false;

describe('Rules: '+ruldId, function(){

    it('should result in an error', function(){
        var code = 'a<style> \r\n body{color:red1;\r\ndisplay:inline;height:100px;}</style>b';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(2);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(3);
        expect(messages[1].col).to.be(16);
        expect(messages[1].type).to.be('warning');
    });

});
