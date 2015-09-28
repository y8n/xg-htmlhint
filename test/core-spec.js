/**
 * Copyright (c) 2014, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2014, Yang Jiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 *
 *
 */

var expect  = require("expect.js");

var HTMLHint  = require("../index").HTMLHint;

describe('Core', function(){

    /**
     * 没有自定义配置时使用默认的配置项
     */
    it('When can not load customer ruleset,should use default', function () {
        var code = "<div></div>";
        HTMLHint.verify(code);
        expect(HTMLHint.ruleset).to.eql(HTMLHint.defaultRuleset);
    });
    it('When can load customer ruleset,merge default', function () {
        var code = "<div></div>";
        HTMLHint.verify(code,{
            'attr-lowercase': false,
            "test-rule":true
        });
        expect(HTMLHint.ruleset["test-rule"]).to.be(true);
        expect(HTMLHint.ruleset["attr-lowercase"]).to.be(false);
        expect(HTMLHint.ruleset["tagname-lowercase"]).to.be(true);
    });

    it('Set false to rule no effected should result in an error', function(){
        var code = '<img src="test.gif" />';
        var messages = HTMLHint.verify(code, {
            'alt-require': false
        });
        expect(messages.length).to.be(1);
    });

    it('Not load default ruleset when use undefined ruleset should result in an error', function(){
        var code = '<P ATTR=\'1\' id="a">><div id="a"><img src="" a="1" a="2"/></div>';
        var messages = HTMLHint.verify(code);
        expect(messages.length).to.be(8);
    });

    it('Not load default ruleset when use empty ruleset should result in an error', function(){
        var code = '<P ATTR=\'1\' id="a">><div id="a"><img src="" a="1" a="2"/></div>';
        var messages = HTMLHint.verify(code, {});
        expect(messages.length).to.be(8);
    });

    it('Inline ruleset not worked should result in an error', function(){
        var code = '<!-- htmlhint alt-require:true-->\r\n<img src="test.gif" />';
        var messages = HTMLHint.verify(code, {
            'alt-require': false
        });
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be('alt-require');
        expect(messages[0].line).to.be(2);
        expect(messages[0].col).to.be(5);

        code = '<!-- htmlhint alt-require:false-->\r\n<img src="test.gif" />';
        messages = HTMLHint.verify(code, {
            'alt-require': true
        });
        expect(messages.length).to.be(1);
    });

});
