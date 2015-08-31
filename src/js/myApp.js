(function(){
	
	if(document.querySelector('.accueil') != null){

		var el = document.querySelector('.nav-accueil');
		el.className += ' ' + 'nav-accueil--active';
	}
	else if(document.querySelector('.prevention') != null){

		el = document.querySelector('.nav-prevention');
		el.className += ' ' + 'nav-prevention--active';
	}
	else if(document.querySelector('.recherche') != null){

		el = document.querySelector('.nav-recherche');
		el.className += ' ' + 'nav-recherche--active';
	}
	else if(document.querySelector('.formation') != null){

		el = document.querySelector('.nav-formation');
		el.className += ' ' + 'nav-formation--active';
	} 
	


	
})()