require('harmonize')();
var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    myPlugin = require('metalsmith-my-plugin'),
    Handlebars = require('handlebars'),
    filter = require('metalsmith-filter');

Handlebars.registerHelper('isSousTitre', function (options) {
    if (this["sous-titre"]) {
        return options.fn(this);
    }
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isDPC', function (options) {
    if (this.financement && this.financement.indexOf('dpc') > -1)
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isHorsDPC', function (options) {
    if (this.financement && this.financement.indexOf('hors-dpc') > -1)
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isSalarie', function (options) {
    if (this.financement && this.financement.indexOf('salarie') > -1)
        return options.fn(this);
    else
        return options.inverse(this);
});

metalsmith(__dirname)
    .use(filter('markdownForPdf/**/*.md'))
    .use(markdown())
    .use(layouts({
        engine: 'handlebars',
        // directory: 'layouts',
        partials: {
                header: 'partials/header.concat',
                footer: 'partials/footer',
        }
    }))
    .destination('./dist-pdf')
    .build(function (err) {
        if (err) throw err;

        // console.log(this.metadata().posts.length);
    });      