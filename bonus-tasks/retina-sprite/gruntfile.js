module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/tmpl.js', 'js/jquery.jcarousel.js', 'js/script.js'],
        dest: 'build/js/script.main.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          'build/js/script.main.min.js': ['build/js/script.main.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/main.min.css': 'css/scss/style.scss',
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        resetoundingPrecision: -1
      },
      target: {
        files: {
          'build/css/ie.min.css': ['css/ie.css']
        }
      }
    },
    sprite:{
      all:{
        src: ['img/partners/*.png'],
        retinaSrcFilter: ['img/partners/*@2x.png'],
        dest: 'img/sprite-partners.png',
        retinaDest: 'img/sprite-partners@2x.png',
        destCss: 'css/sprite-partners.css'
       }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['*.{png,jpg,gif}'],
          dest: 'build/img'
        }]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      scss: {
        files: ['css/scss/*/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['css/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false
        }
      },
      img: {
        files: ['img/*'],
        tasks: ['imagemin']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-spritesmith');
  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'sprite', 'imagemin', 'watch']);

};