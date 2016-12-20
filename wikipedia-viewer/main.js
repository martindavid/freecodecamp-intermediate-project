  // IIFE - Immediately Invoked Function Expression
  (function(index) {

      // The global jQuery object is passed as a parameter
      index(window.jQuery, window, document);

      }(function($, window, document) {

          // The DOM is ready!
          $(function() {
              $('#loader').hide();
              $.materialize.init();
          });

          // The rest of your code goes here!
      }
  ));