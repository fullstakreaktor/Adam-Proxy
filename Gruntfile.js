module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'reservation-service/public/bundle.js',
          'hero-photo-service/client/dist/bundle.js',
          'Review-Service/client/dist/app.js',
          'about-service/public/app.js'
        ],
        dest: 'public/bundle.js'
      },
      // dist: {
      //   src: [
      //     'about-service/public/styles.css',
      //     'hero-photo-service/client/dist/app.css',
      //     'reservation-service/public/styles.css',
      //     'Review-Service/client/dist/app.css'
      //   ],
      //   dest: 'public/bundled-styles.css'
      // }
    },

    connect: {
        server: {
          options: {
              port: 3004,
              base: 'public',
              hostname: 'localhost',
              keepalive: true,
              open: true,
              livereload: true,
              middleware: function (connect, options, middlewares) {
                middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                return middlewares;
              }
          },
        proxies: [
            {
            context: '/review_service',
            host: 'localhost',
            port: 3002,
            rewrite: {
                '^/review_service':'/api'
            }
          },
         {
            context: '/hero_service',
            host: 'localhost',
            port: 3000,
            rewrite: {
                '^/hero_service':'/'
            }
          },
          {
            context: '/about_service',
            host: 'localhost',
            port: 3001,
            rewrite: {
                '^/about_service':'/'
            }
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['concat']);

  grunt.registerTask('server', function(target) {
    grunt.task.run([
      'configureProxies:server',
      'connect:server',
    ]);
  });
}