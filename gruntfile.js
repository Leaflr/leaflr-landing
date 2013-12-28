var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt){

    "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'build/css/main.css': 'build/css/main.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'build/css/main.css',
                dest: 'build/css/main.css'
            }
        },

        sass: {
            build: {
                files: {
                    'project/css/main.css': 'project/stylesheets/main.scss'
                }
            }
        },

        watch: {
            // html: {
            //     files: ['index.html'],
            //     tasks: ['htmlhint']
            // },
            // js: {
            //     files: ['project/scripts/main.js'],
            //     tasks: ['uglify']
            // },
            compass: {
                files: ['project/stylesheets/*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'project/*.html',
                    'project/stylesheets/{,*/}*.{scss,sass}',
                    'project/scripts/{,*/}*.js',
                    'project/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'project'),
                            lrSnippet
                        ];
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,                      
// Force tags to have a closing pair
                    'tagname-lowercase': true,             
// Force tags to be lowercase
                    'attr-lowercase': true,                
// Force attribute names to be lowercase e.g. <div id="header"> is invalid
                    'attr-value-double-quotes': true,      
// Force attributes to have double quotes rather than single
                    'doctype-first': true,                 
// Force the DOCTYPE declaration to come first in the document
                    'spec-char-escape': true,              
// Force special characters to be escaped
                    'id-unique': true,                     
// Prevent using the same ID multiple times in a document
                    'head-script-disabled': true,          
// Prevent script tags being loaded in the  for performance reasons
                    'style-disabled': true                 
// Prevent style tags. CSS should be loaded through 
                },
                src: ['index.html']
            }
        },

        uglify: {
            build: {
                files: {
                    'build/script/main.min.js': ['project/scripts/base.js']
                }
            }
        }

    });

    grunt.registerTask('default', [
    	'connect:livereload',
        'open',
        'watch'
    ]);
    grunt.registerTask('build',  ['sass', 'cssc', 'cssmin']);

};