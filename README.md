# xg-htmlhint

xg-htmlhint 是一个静态的HTML代码检查工具，可以在命令行和页面脚本中使用。Fork自[https://github.com/yaniswang/HTMLHint](https://github.com/yaniswang/HTMLHint)，在其基础上做了部分改进和扩展。  

## Quick Start
1. install & options

	```
	npm install htmlhint -g
	htmlhint -V
	htmlhint -l
	htmlhint -c rule.conf
	```
2. hint
	
	```
	htmlhint test.html
	htmlhint test/
	htmlhint 
	```
3. result

	```
	test.html:
    	line 1, col 1: Doctype must be uppercase.
    	line 11, col 21: The value of attribute [ class ] must be in double quotes.
		line 14, col 2: Special characters must be escaped : [ < ].
    	line 14, col 49: Special characters must be escaped : [ > ].
    	line 14, col 78: Tag must be paired, no start tag: [ <button> ]

	4 Errors,1 Warnings
	```
4. config rules  
	根目录下获取`.htmlhintrc`文件中的内容作为自定义配置规则，如果没有就使用[默认规则](https://github.com/yangjiyuan/xg-htmlhint/wiki/Rules#default-rules)。也可以指定配置文件，使用命令`htmlhint -c rule.conf`。  
	行内嵌套规则
	
	```
	<!--htmlhint tag-pair:false,id-class-value:underline -->
	<html>
	<head>
	``` 
	
## Guide
1. [如何使用](https://github.com/yangjiyuan/xg-htmlhint/wiki/Usage)
2. [规则列表](https://github.com/yangjiyuan/xg-htmlhint/wiki/Rules)
3. [如何添加自定义规则](https://github.com/yangjiyuan/xg-htmlhint/wiki/Developer-Guide)

  
