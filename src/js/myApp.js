(function(){
	
	if(document.querySelector('#js-accueil') != null){

		var el = document.querySelector('.nav-accueil');
		el.className += ' ' + 'nav-accueil--active';
	}
	else if(document.querySelector('#js-prevention') != null){

		el = document.querySelector('.nav-prevention');
		el.className += ' ' + 'nav-prevention--active';
	}
	else if(document.querySelector('#js-recherche') != null){

		el = document.querySelector('.nav-recherche');
		el.className += ' ' + 'nav-recherche--active';
	}
	else if(document.querySelector('#js-formation') != null){

		el = document.querySelector('.nav-formation');
		el.className += ' ' + 'nav-formation--active';
	} 
	


	
})();