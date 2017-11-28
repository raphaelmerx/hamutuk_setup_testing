module.exports = function(grunt) {
    var file_paths = [];
    var javascriptRegex = /script type="text\/javascript" src="(lib.*)"/g;
    var cssRegex = /link rel="stylesheet" type="text\/css" href="(lib.*)"/g;
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'www/sass/',
                    src: ['*.scss'],
                    dest: 'www/css/',
                    ext: ['.css']
                }]
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'www/css/index.min.css': ['www/css/index.css']
                }
            }
        },
        search: {
            // Find all JS and CSS files with URL 'lib/*' linked in index.html, add their path to file_paths.
            bowerJavascript: {
                files: { src: ['www/index.html'] },
                options: {
                    searchString: javascriptRegex,
                    logFile: '/tmp/grunt.json',
                    onMatch: function(match) {
                        var file_path = javascriptRegex.exec(match.match)[1];
                        file_paths.push(file_path);
                    }
                }
            },
            bowerCss: {
                files: { src: ['www/index.html'] },
                options: {
                    searchString: cssRegex,
                    logFile: '/tmp/grunt.json',
                    onMatch: function(match) {
                        var file_path = cssRegex.exec(match.match)[1];
                        file_paths.push(file_path);
                    }
                }
            },
        },
        copy: {
            // copy files from the bower-managed lib/ folder to the www/lib folder
            main: {
                files: [
                    {expand: false, src: file_paths, dest: 'www/', filter: 'isFile'},
                ],
            },
        },
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-search');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Register Tasks
    grunt.registerTask('sassify', ['sass', 'cssmin']);
    // The bower_copy task finds js or css files linked from index.html, and copies them from lib/ to www/lib/
    grunt.registerTask('bower_copy', ['search', 'copy']);
};
