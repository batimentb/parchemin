/*
 *	Pour initialiser les fcts générale et les fcts spécifiques de certaines pages
 *
 *	En premiers les inits généraux
 *	Ensuite les inits spécifiques suivant la page dans laquelle on se trouve ou si un element particulier et dans le dom
 *
 */

// includes Django's CSRF_TOKEN in unsafe Ajax requests
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!(/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type)) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
    }
  }
});

 //-->Des variables gobales
var MALIHU_THEME = "dark"; //Le theme utilisé pour malihu (malihu-custom-scrollbar-plugin)
var activeDebugLog = true; //Permet de coupe les logs qui passe par la fonction debugConsole();

//>Pour que tous les select2 du site aient le theme bootstrap
	$.fn.select2.defaults.set( "theme", "bootstrap" );

$(document).ready(function() {
/*
 *
 * INITS GENERAUX__:
 *
 */

//>Tooltipe les tooltips
    $('[data-toggle=tooltip]').tooltip();


//>Calcul de la taille disponible (de la fenetre), Cette fct utilise des variables globales
	dimensionsFenetre(); //ON a aussi besoin d'appeler cette fct au resize
	//on rapelle la fct plus tard si des elements n'ont pas eu le temps de charger (images,...)
	setTimeout(function(){
		//dimensionsFenetre();
	}, 800);

//>Va a chaque resize appeler une fct
	var the_timer;
	$( window ).on( "resize orientationchange", function( event ) {
		//Le fait d'utiliser en timer evite de consommer trop de ressource quand on s'amuse a redimensionner la fenetre
		//Ca fluidifi et ca evite quelques bugs quand on relache la fenetre
		clearTimeout(the_timer);
		the_timer = setTimeout(function(){
			resizeFctsLaunch();
			calerCenterSite();
		}, 75);
		return true;
	});

//>Va a chaque scroll appeler une fct.
var ticking = false;
$(window).on("scroll", function(event) {
	if (!ticking) {
		window.requestAnimationFrame(function() {
			scrollHandler();
			ticking = false;
		});
	}
	ticking = true;
	return true;
});

calerCenterSite();//Place la div de contenu principal

//>Pour pouvoir utiliser le smooth scroll
	//initSmoothScrooll();

//>Va fixer les éléments qui sont déclarés
	//fixedChild();

//>Initilise les datepickers
	datePickers();

//>Rerchercher ds le listing clients/adhérents
	rechercheClients();

/*
 * INIT SPECIFIQUE__:
 * En fonction des pages ou si certaine div sont présentes
 *
 */

 /*
  Attention ne plus mettre d'init spécifique dans ce fichier.
  Les inits spécifiques à chaque page sont à placer en bas des pages dans le bloc "{% block scripts %}{%- endblock %}"
 */

});//End document ready
/*
//>Aide mémoire_:
//BIEN utiliser setTimeout() et setInterval() comme ci-dessous_:
//Cest important pr garder les performances
setInterval(function () {
    maFonction(parametre1, parametre2);
}, 5000);
//*/