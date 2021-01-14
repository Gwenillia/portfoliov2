/* eslint-disable global-require */
module.exports = (grunt) => {
  grunt.initConfig({
    // pug task
    pug: {
      compile: {
        options: {
          data: {
            debug: true,
          },
          pretty: true,
        },
        files: [
          {
            src: '[^_]*.pug',
            cwd: 'src/pug',
            dest: 'dist',
            expand: true,
            ext: '.html',
          },
          {
            src: '[^_]*.pug',
            cwd: 'src/pug/pages',
            dest: 'dist/pages',
            expand: true,
            ext: '.html',
          },
        ],
      },
    },

    // ts task
    ts: {
      default: {
        tsconfig: './tsconfig.json',
      },
      dist: {
        files: [
          {
            src: '[^_]*.ts',
            cwd: 'src/ts',
            dest: 'dist/js',
            expand: true,
            ext: '.js',
          },
        ],
      },
    },

    // sass task
    sass: {
      dist: {
        options: {
          // eslint-disable-next-line global-require
          implementation: require('sass'),
          style: 'inline',
        },
        files: [
          {
            src: '[^_]*.sass',
            cwd: 'src/sass/',
            dest: 'dist/css',
            expand: true,
            ext: '.css',
          },
        ],
      },
    },

    // copy task (copy src/libraries to dist/libraries)
    copy: {
      library: {
        expand: true,
        cwd: 'src',
        src: ['libraries/**'],
        dest: 'dist/',
      },
      public: {
        expand: true,
        cwd: 'src/public',
        src: ['**'],
        dest: 'dist',
      },
    },

    // image compress task (compress all image src/images to dist/images)
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['images/**/*.{png,jpg,gif}'],
            dest: 'dist/assets/images/',
          },
        ],
      },
    },

    // auto refresh view on change in dist directory
    browserSync: {
      dev: {
        bsFiles: {
          src: ['dist/**.*'],
        },
        options: {
          watchTask: true,
          server: './dist',
        },
      },
    },

    // postcss tasks
    postcss: {
      options: {
        map: {
          inline: false,
          annotation: 'dist/css/maps/',
        },
        processors: [require('autoprefixer'), require('cssnano')()],
      },
      dist: {
        files: [
          {
            src: '[^_]*.css',
            cwd: 'dist/css/',
            dest: 'dist/css',
            expand: true,
            ext: '.css',
          },
        ],
      },
    },

    // watch change inside directory to run task
    watch: {
      pug: {
        files: ['src/pug/**/*.pug'],
        tasks: ['pug'],
      },
      sass: {
        files: ['src/sass/**/*.sass'],
        tasks: ['sass'],
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['babel'],
      },
      babel: {
        files: ['src/js/**/*.js'],
        tasks: ['babel'],
      },
      ts: {
        files: ['src/ts/**/*.ts'],
        tasks: ['ts'],
      },
      copy: {
        files: ['src/libraries/**', 'src/public/**'],
        tasks: ['copy'],
      },
      imagemin: {
        files: ['src/images/**'],
        tasks: ['imagemin'],
      },
    },

    // babel
    babel: {
      options: {
        sourceMap: false,
      },
      dist: {
        files: {
          'dist/js/app-babel.js': 'dist/js/app.js',
        },
      },
    },
  });

  // initial
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-babel');

  // register default task
  if (process.env.NODE_ENV === 'production') {
    grunt.registerTask('default', [
      'pug',
      'sass',
      'ts',
      'copy',
      'imagemin',
      'postcss',
      'babel',
    ]);
  } else {
    grunt.registerTask('default', [
      'pug',
      'sass',
      'ts',
      'copy',
      'imagemin',
      'browserSync',
      'babel',
      'watch',
    ]);
  }
};
