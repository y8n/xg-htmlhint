/*global module:false*/
module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-mocha-hack');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
                options: {
                    jshintrc: ".jshintrc"
                }
            }
        },
        clean: ["lib"],
        concat: {
            htmlhint: {
                src: ['src/core.js', 'src/reporter.js', 'src/htmlparser.js', 'src/rules/*.js'],
                dest: 'lib/xg-htmlhint.js'
            }
        },
        "mocha-hack": {
            test: {
                src: "test/**/*.js",
                options: {
                    useColors: true,
                    reporter: 'spec'
                }
            }
        },
        uglify: {
            htmlhint: {
                options: {
                    banner: "/*!\r\n * xg-HTMLHint v<%= pkg.version %>\r\n * https://github.com/yangjiyuan/xg-htmlHint\r\n *\r\n * (c) 2015 Yang Jiyuan<yjy972080142@gmail.com>.\r\n * MIT Licensed\r\n */\n",
                    beautify: {
                        ascii_only: true
                    }
                },
                files: {
                    'lib/<%= pkg.name %>.js': ['<%= concat.htmlhint.dest %>']
                }
            }
        },
        replace: {
            htmlhint: {
                files: {
                    'lib/xg-htmlhint.js':'lib/xg-htmlhint.js'
                },
                options: {
                    prefix: '@',
                    variables: {
                        'VERSION': '<%= pkg.version %>'
                    }
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.js'],
                tasks: 'dev'
            },
            test: {
                files: ['test/**/*.js'],
                tasks: 'test'
            }
        }
    });


    grunt.registerTask('build', ['jshint','clean', 'concat']);

    grunt.registerTask('test', ['build','mocha-hack']);

    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'test', 'uglify', 'replace']);

};
