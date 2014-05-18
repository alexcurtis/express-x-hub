/******************************************************************************
 * 
 * QUANEO OPEN SOURCE
 * __________________
 * 
 * [2013] - [2014] Quaneo Ltd.
 * All Rights Reserved.
 * 
 * This software may be freely distributed under the MIT license.
 *
 * Authors: 
 * Alex Curtis, Quaneo Ltd
 *
 *****************************************************************************/
 
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        //Spot Check JS Files
        jshint:{
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                nonew: true,
                plusplus: false,
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                browser: true,
                node: true,
                globals: {
                    define: true,
                    require: true,
                    Bootstrap: true,
                    jQuery: true,
                    console: true,
                    alert: true,
                    module: true
                }
            },
            lib: {
                src: [
                    'Gruntfile.js',
                    'lib/**/*.js',
                    'index.js'
                ]
            }
        },

        //Developer Build Aid
        watch: {
            lib: {
                files: ['<%= jshint.lib.src %>'],
                tasks: ['jshint:lib']
            }  
        }
        
    });

    //Plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
