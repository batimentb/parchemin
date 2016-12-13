/*
 * Ajouter dans ce fichier les polyfills nécessaire.
 /

/********************************************************************************************
//> POLYFILL requestAnimationFrame
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
********************************************************************************************/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/*
 * 
 * Prothèse d'émulation (polyfill)
 * (SOURCE : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/forEach#Proth%C3%A8se_d%27%C3%A9mulation_(polyfill))
 * 
 * forEach fut ajouté avec ECMAScript 5 (la cinquième édition du standard ECMA-262). Certains environnements basés sur d'anciens standards peuvent ne pas disposer de cette méthode. Pour parer à ce cas, on peut émuler la fonction en utilisant le fragment de code ci-dessous. L'algorithme utilisé dans ce code correspond exactement à celui défini par ECMAScript 5, sous réserve que Object et TypeError n'aient pas été modifiés et que callback.call corresponde à la valeur originale de Function.prototype.call.
 * 
 * ECMA-262, Edition 5, 15.4.4.18
 * Référence: http://es5.github.io/#x15.4.4.18
*/
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this === null) {
      throw new TypeError(' this vaut null ou n est pas défini');
    }

    // 1. Soit O le résultat de l'appel à ToObject
    //    auquel on a passé |this| en argument.
    var O = Object(this);

    // 2. Soit lenValue le résultat de l'appel de la méthode 
    //    interne Get sur O avec l'argument "length".
    // 3. Soit len la valeur ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. Si IsCallable(callback) est false, on lève une TypeError.
    // Voir : http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' n est pas une fonction');
    }

    // 5. Si thisArg a été fourni, soit T ce thisArg ;
    //    sinon soit T égal à undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Soit k égal à 0
    k = 0;

    // 7. On répète tant que k < len
    while (k < len) {

      var kValue;

      // a. Soit Pk égal ToString(k).
      //   (implicite pour l'opérande gauche de in)
      // b. Soit kPresent le résultat de l'appel de la 
      //    méthode interne HasProperty de O avec l'argument Pk.
      //    Cette étape peut être combinée avec c
      // c. Si kPresent vaut true, alors
      if (k in O) {

        // i. Soit kValue le résultat de l'appel de la 
        //    méthode interne Get de O avec l'argument Pk.
        kValue = O[k];

        // ii. On appelle la méthode interne Call de callback 
        //     avec T comme valeur this et la liste des arguments
        //     qui contient kValue, k, et O.
        callback.call(T, kValue, k, O);
      }
      // d. On augmente k de 1.
      k++;
    }
    // 8. on renvoie undefined
  };
}