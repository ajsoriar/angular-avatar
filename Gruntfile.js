'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: [
                    'src/*.*'
                ],
                tasks: ['test'],
                options: {
                    livereload: 9090,
                }
            }
        },
        clean: {
            build: {
                src: ['dist/*']
            }
        },
        copy: {
            build: {
                files: [{
                    cwd: 'src',
                    src: [
                        '**',
                    ],
                    dest: 'dist',
                    expand: true
                }]
            }
        },
        uglify: {
            options: {
                preserveComments: 'some', // will preserve all comments that start with a bang (!) or include a closure compiler style directive (@preserve)
                mangle: false, // false to prevent changes to your variable and function names.
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'dist/angular-avatar.min.js': ['dist/angular-avatar.js']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'tests/karma.conf.js',
                singleRun: true
            }
        }
    });

    // Include functionality
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('build', ['clean', 'copy', 'uglify']);
    grunt.registerTask('test', ['karma']);

};
