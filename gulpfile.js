/*
 Tâches disponibles :
 - sass : pour générer les feuilles de styles (.scss).
 - scripts : pour les script js

 $ gulp dev  //Compile et surveille si une modification survient dans le style
 $ gulp //Compile un coup [defaut]

 Inspiration secondaire : https://pflry.eu/2015/08/29/workflow-bootstrap-sass-avec-gulp-et-bower/
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'), //compile les fichiers Sass (.scss)
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'), //préfixe les CSS
    rename = require('gulp-rename'), //renomme les fichiers
    minifycss = require('gulp-clean-css'), //minifie les feuilles de styles (.css) cest le remplacant de "gulp-minify-css"
    concat = require('gulp-concat'), //concatène les fichiers
    uglify = require('gulp-uglify'), //minifie les fichiers (.js)
    gutil = require('gulp-util'), //fonctions utilitaires pour les plugins Gulp
    size = require('gulp-filesize'); // affiche la taille des fichiers minifiés

// Paths
var bower = './bower_components',
    inputSass = './src/sass/parchemin.scss',
    output = './dist',
    jsPath = './src/js'; //Dossier avec nos fichiers JS,
    imagesPath = "./src/images/*/*",
    fontsPath = './src/fonts/**/*',
    fontPath = './src/font/**/*';

//Option Sass
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed', //nested, expanded, compact, compressed
};

// Option autoprefixer
var autoprefixerOptions = {
    browsers: ['last 10 versions', '> 1%', 'Explorer >= 8', 'ie >= 8', 'Safari >= 7']
};

//> Tache SASS (css)
gulp.task('sass', function () {
    return gulp
    // Find all `.scss` files from the `stylesheets/` folder
        .src(inputSass)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError)) // Run Sass on those files
        .pipe(autoprefixer(autoprefixerOptions))
        //.pipe(size()) //La size est bidon....
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output + "/css/")) // Write the resulting CSS in the output folder
        .on('end', function () {
            gutil.log(gutil.colors.yellow('♠ La tâche SASS est terminée.'));
        });
});

//>Les css des librairies embarquées
gulp.task('styleslibs', function () {
    return gulp.src([
        bower + "/font-awesome/css/*.min.css",
    ])
        .pipe(concat('second.css'))
        .pipe(minifycss())
        .pipe(size())
        .pipe(gulp.dest(output + "/css/"))
        .on('end', function () {
            gutil.log(gutil.colors.yellow('♠ La tâche CSS (libs) est terminée.'));
        });
});


//> Javascript task (bower)
gulp.task('scriptsBower', function () {
    return gulp.src([
        //bower + '/jquery/dist/jquery.js',
        //bower + '/noty/js/noty/packaged/jquery.noty.packaged.min.js',
    ])
        .pipe(uglify())
        .pipe(concat('libs.js'))
        .pipe(size())
        .pipe(gulp.dest(output + "/js/"))
        .on('end', function () {
            gutil.log(gutil.colors.yellow('♠ La tâche JavaScript (bower) est terminée.'));
        });
});

//> Javascript task (dev perso dans lib)
gulp.task('scriptsPerso', function () {

    return gulp.src([
        jsPath + '/*.js'
    ])
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(size())
        .pipe(gulp.dest(output + "/js/"))
        .on('end', function () {
            gutil.log(gutil.colors.yellow('♠ La tâche JavaScript (scripts perso) est terminée. Total size '));
        });
});


gulp.task("copyFonts", function () {
    return gulp.src([
        fontsPath,
        bower + "/font-awesome/fonts/*"
    ])
        .pipe(gulp.dest(output + "/fonts/"))
        .on('end', function () {
            gutil.log(gutil.colors.yellow('♠ La tâche copie des fonts (fonts) est terminée.'));
        });
});

/*
gulp.task("copyFont", function () {
    return gulp.src([
        bower + "/weather-icons/font/*"
    ])
        .pipe(gulp.dest(output + "/font/"))
        .on('end', function () {
            gutil.log(gutil.colors.yellow('♠ La tâche copie des fonts (font) est terminée.'));
        });
});//*/

gulp.task("copyCssImages", function () {

    return gulp.src([
        imagesPath
    ])
        .pipe(gulp.dest(output + "/images/"))
        .on('end', function () {
            gutil.log(gutil.colors.yellow('♠ La tâche copie des images est terminée.'));
        });
});

//> Watch : Surveillance des taches pour recompiler automatiquement les sass
gulp.task('watch', function () {
    //return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    gulp.watch(inputSass, ['sass'])
    // When there is a change,
    // log a message in the console
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });

    gulp.watch(jsPath + '/*.js', ['scriptsPerso'])
    // When there is a change,
    // log a message in the console
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

/*
 // tâche qui surveille le changement / modifications effectuées au niveau des fichiers scss
 gulp.task('watch', ['browserSync', 'compass'], function() {
 gulp.watch('sass/*.scss', ['compass']);
 });
 */

//> Dev task
gulp.task('dev', function () {
    gulp.start('sass', 'scriptsBower', 'scriptsPerso', 'styleslibs', 'copyFonts', 'copyCssImages', 'watch');
});

//> Tache a lancer par defaut
gulp.task('default', ['sass', 'scriptsBower', 'scriptsPerso', 'styleslibs', 'copyFonts', 'copyCssImages', /*, possible other tasks... */]);