require('harmonize')();
var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    templates = require('metalsmith-in-place'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    Handlebars = require('handlebars'),
    fs = require('fs');


// Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/layouts/partials/header.tmpl.html').toString());
// Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/layouts/partials/footer.tmpl.html').toString());
Handlebars.registerHelper('isAxePrevention', function(options){
    //  console.log(this.titre);
    //  console.log(this.axe);
    if(this.axe === 'prevention')
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isAxeRecherche', function(options){
    //  console.log(this.titre);
    //  console.log(this.axe);
    if(this.axe === 'recherche')
        return options.fn(this);
    else
        return options.inverse(this);
});

Handlebars.registerHelper('isAxeFormation', function(options){
    //  console.log(this.titre);
    //  console.log(this.axe);
    if(this.axe === 'formation')
        return options.fn(this);
    else
        return options.inverse(this);
});

metalsmith(__dirname)
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        posts: {
            pattern: 'content/posts/*.md',
            reverse: true
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':collection/:titre'
    }))
    .use(layouts({
        engine: 'handlebars',
        // directory: 'layouts',
        partials: {
             header: 'partials/header',
             footer: 'partials/footer',
             nav: 'partials/nav',
             axe: 'partials/axe',
             axePrevention: 'partials/axe-prevention',
             axeRecherche: 'partials/axe-recherche',
             axeFormation: 'partials/axe-formation'
       }
    }))
    .destination('./dist')
    .build(function(err) {
	    if (err) throw err;
        
        // console.log(this.metadata().posts.length);
        // console.log(this.metadata().posts[0]);
	  })
      