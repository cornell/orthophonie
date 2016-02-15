require('harmonize')();
var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    templates = require('metalsmith-in-place'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    excerpts = require('metalsmith-excerpts'),
    myPlugin = require('metalsmith-my-plugin'),
    Handlebars = require('handlebars'),
    fs = require('fs'),
    multimatch = require('multimatch'),
    filter = require('metalsmith-filter'),
    html2pdf = require('gulp-html2pdf');

Handlebars.registerHelper('isSousTitre', function (options) {
    if (this["sous-titre"]) {
        return options.fn(this);
    }
    else
        return options.inverse(this);
});


Handlebars.registerHelper('isOrganisateurHLR', function (options) {
    if (this.organisateur === 'organisateur-hlr') {
        return options.fn(this);
    }
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isOrganisateurKB', function (options) {
    if (this.organisateur === 'organisateur-kb') {
        return options.fn(this);
    }
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isOrganisateurMRF', function (options) {
    if (this.organisateur === 'organisateur-mrf')
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isAxePrevention', function (options) {
    if (this.axe === 'prevention')
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isAxeRecherche', function (options) {
    if (this.axe === 'recherche')
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isAxeFormation', function (options) {
    if (this.axe === 'formation')
        return options.fn(this);
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
    .use(filter([
        'content/**/*.md', 
        'css/*.css', 
        'font/*.*',
        'js/*.js'
    ]))
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        posts: {
            pattern: 'content/posts/*.md',
            reverse: true
        },
        prevention: {
            pattern: 'content/prevention/*.md',
            reverse: true
        },
        recherche: {
            pattern: 'content/recherche/*.md',
            reverse: true
        },
        formation: {
            pattern: 'content/formation/*.md',
            reverse: true
        }
    }))
    .use(markdown())
    .use(excerpts())
    .use(myPlugin())
    .use(permalinks({
        pattern: ':collection/:titre'
    }))
    .use(layouts({
        engine: 'handlebars',
        // directory: 'layouts',
        partials: {
            header: 'partials/header.concat',
            footer: 'partials/footer',
            nav: 'partials/nav',
            axe: 'partials/axe',
            axePrevention: 'partials/axe-prevention',
            axeRecherche: 'partials/axe-recherche',
            axeFormation: 'partials/axe-formation',
            articleResume: 'partials/article-resume',
            articleInfo: 'partials/article-info',
            inscriptionTarif: 'partials/inscription-tarif'
        }
    }))
    .destination('./dist')
    .build(function (err) {
        if (err) throw err;
        
         //createPdf();
    });