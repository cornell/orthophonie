(function(){
    
    var el = document.querySelector('.header__icon');
    el.addEventListener('click', function(e){
        e.preventDefault();
        var elMenu = document.querySelector('body');
        elMenu.classList.toggle('width-sidebar');        
    })
    
    el = document.querySelector('.site-cache');
    el.addEventListener('click', function(e){
        //e.preventDefault();
        document.querySelector('body')
            .classList.remove('width-sidebar');        
    })
})();