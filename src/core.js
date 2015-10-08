/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT Licensed
 */
var HTMLHint = (function (undefined) {

    var HTMLHint = {};

    HTMLHint.version = '@VERSION';

    HTMLHint.rules = {};

    //默认配置
    HTMLHint.defaultRuleset = {
        'doctype-first': true,
        'title-tag-require': true,
        'tagname-lowercase': true,
        'tag-pair': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'attr-no-duplication': true,
        'id-name-unique': true,
        'spec-char-escape': true
    };

    HTMLHint.addRule = function(rule){
        HTMLHint.rules[rule.id] = rule;
    };

    HTMLHint.verify = function(html, rulesetOptions){
        var ruleset = {};
        for(var jj in rulesetOptions){
            if(Object.getOwnPropertyNames(rulesetOptions).indexOf(jj) !== -1){
                ruleset[jj] = rulesetOptions[jj];
            }
        }
        /**
         * 没有自定义地址的时候使用默认地址，有自定义的时候和默认地址合并
         */
        var _ruleset = {};
        for(var ii in HTMLHint.defaultRuleset){
            if(Object.getOwnPropertyNames(HTMLHint.defaultRuleset).indexOf(ii) !== -1){
                _ruleset[ii] = HTMLHint.defaultRuleset[ii];
            }
        }

        // parse inline ruleset
        html = html.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, function(all, strRuleset){
            if(ruleset === undefined){
                ruleset = {};
            }
            strRuleset.replace(/(?:^|,)\s*([^:]+)\s*:\s*([^,\s]+)/g, function(all, key, value){
                if(value === 'false'){
                    value = false;
                }
                else if(value === 'true'){
                    value = true;
                }
                ruleset[key] = value;
            });
            return '';
        });

        if(ruleset && Object.keys(ruleset).length > 0){
            for(var i in ruleset){
                if(Object.getOwnPropertyNames(ruleset).indexOf(i) !== -1){
                    _ruleset[i] = ruleset[i];
                }
            }
        }
        ruleset = _ruleset;

        HTMLHint.ruleset = ruleset;

        var parser = new HTMLParser();
        var reporter = new HTMLHint.Reporter(html.split(/\r?\n/), ruleset);

        var rules = HTMLHint.rules,
            rule;
        for (var id in ruleset){
            rule = rules[id];
            if (rule !== undefined && ruleset[id] !== false){
              rule.init(parser, reporter, ruleset[id]);
            }
        }

        parser.parse(html);

        return reporter.messages;
    };

    return HTMLHint;

})();

if (typeof exports === 'object' && exports){
    exports.HTMLHint = HTMLHint;
}
