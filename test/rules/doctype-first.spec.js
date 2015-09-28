/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, Yang Jiyuan <yangjiyuan@meituan.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'doctype-first',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Doctype not be first should result in an error', function(){
        var code = '     <html></html><!-- this is commet -->';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(6);

        code = '<!-- comment --><!doctype html><html></html>';
        messages = HTMLHint.verify(code,ruleOptions);
        expect(messages.length).to.be(1);

        code = '<!doctypee html><html></html>';
        messages = HTMLHint.verify(code,ruleOptions);
        expect(messages.length).to.be(1);


    });

    it('Doctype be first should not result in an error', function(){

        //HTML5 style
        var code = '<!DOCTYPE HTML><html></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);

        // not HTML5 style
        code = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html></html>';
        messages = HTMLHint.verify(code,ruleOptions);
        expect(messages.length).to.be(0);
    });

});
