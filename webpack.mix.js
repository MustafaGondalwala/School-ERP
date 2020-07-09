const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.browserSync('admin.schoolerp.test'); 

mix.webpackConfig({
    output:{
        chunkFilename:'js/react/[name].chunck.js',
    }
});

mix.react('resources/js/app.js', 'public/js');
