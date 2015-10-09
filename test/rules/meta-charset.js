/**
 * Copyright (c) 2015, YangJiyuan <YJY972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'meta-charset',
    ruleOptions = {};

ruleOptions[ruldId] = true;
ruleOptions["doctype-first"] = false;
ruleOptions["title-tag-require"] = false;

describe('Rules: '+ruldId, function(){

    it('No head tag should not result in an error', function(){
        var code = '<body></body>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('No meta tags present in head tag should result in an error', function(){
        var code = '<head></head><body></body>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('error');
    });

    it('meta tag has charset attribute', function(){
        var code = '<head><meta charset="utf-8"></head>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);

        code = '<head><meta charset=""></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('error');
    });

    it('meta tag has "http-equiv" and "content" attribute', function(){
        var code = '<head><meta http-equiv="charset" content="utf-8"></head>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);

        code = '<head><meta http-equiv="charset" content=""></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('error');

        code = '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);

        code = '<head><meta http-equiv="Content-Type" content="charset=utf-8"></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);

        code = '<head><meta http-equiv="Content-Type" content=""></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('error');
    });


});
