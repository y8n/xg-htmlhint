/**
 * Copyright (c) 2015, Yang Jiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'title-tag-require',
    ruleOptions = {
        "doctype-first":false
    };


describe('Rules: '+ruldId, function(){

    it('miss head and title tag should not result in an error', function(){
        var code = '<html><div id="test"></div></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('miss title tag in head tag should result in an error', function(){
        var code = '<html><head></head></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('title tag in head tag should not result in an error', function(){
        var code = '<html><head><title>Hello</title></head></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
