module.exports = function(grunt) {

  // Start web server
  // Compile developer friendly environment
  // $ grunt serve

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '.tmp/main.css': 'src/styles/main.scss'
        }
      },
      build: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/main.css': 'src/styles/main.scss'
        }
      }
    },
    pug: {
      dev: {
        files: {
          '.tmp/index.html': 'src/index.pug'
        }
      },
      build: {
        files: {
          'build/index.html': 'src/index.pug'
        }
      }
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015']
      },
      build: {
        files: {
          'build/js/*.js': 'src/js/*.js'
        }
      }
    },
    uglify: {
      build: {
        'src': ['build/js/*.js'],
        'dest': 'build/combined.min.js'
      }
    },
    cssmin: {
      build: {
        'src': '.tmp/base.css',
        'dest': 'build/combined.min.css'
      }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },
    copy: {
      dev: {
        expand: true,
        cwd: 'src/js/',
        src: ['*.js'],
        dest: '.tmp/'
      }
    },
    watch: {
      copy: {
        files: 'src/js/*.js',
        tasks: ['copy:dev']
      },
      css: {
        files: ['src/styles/*.scss', 'src/styles/**/*.scss'],
        tasks: ['sass:dev']
      },
      pug: {
        files: 'src/index.pug',
        tasks: ['pug:dev']
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: {
          livereload: true
        },
        files: ['.tmp/*']
      }
    },
    clean: {
      build: {
        src: ['build/']
      }
    },
    'gh-pages': {
      options: {
        base: 'build'
      },
      // These files will get pushed to the `gh-pages` branch (the default).
      src: ['*.*']
    }
  });

  require('jit-grunt')(grunt);

  grunt.registerTask('default', [
    'dev',
    'watch'
  ]);

  // Compile developers files
  grunt.registerTask('dev', [
    'copy:dev',
    'pug:dev',
    'sass:dev'
  ]);

  // Compile production files
  grunt.registerTask('build', [
    'pug:build',
    'sass:build',
    'cssmin',
    'babel',
    'uglify'
  ]);

  // Send production files to GitHub pages
  grunt.registerTask('deploy', [
    'build',
    'gh-pages'
  ]);
};
