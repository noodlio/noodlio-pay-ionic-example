// Noodlio Pay
// Example with Checkout (Option 2)

// These are fixed values, do not change this
var NOODLIO_PAY_API_URL         = "https://noodlio-pay.p.mashape.com"; 
var NOODLIO_PAY_API_KEY         = "3fEagjJCGAmshMqVnwTR70bVqG3yp1lerJNjsnTzx5ODeOa99V";
var NOODLIO_PAY_CHECKOUT_KEY    = {test: "pk_test_QGTo45DJY5kKmsX21RB3Lwvn", live: "pk_live_ZjOCjtf1KBlSHSyjKDDmOGGE"};

// Obtain your unique Stripe Account Id from here:
// https://www.noodl.io/pay/connect
var STRIPE_ACCOUNT_ID           = "<YOUR-UNIQUE-ID>";

// Define whether you are in development mode (TEST_MODE: true) or production mode (TEST_MODE: false)
var TEST_MODE = true;

angular.module('starter', ['ionic', 'stripe.checkout', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, StripeCheckoutProvider) {

  // Defines your checkout key
  switch (TEST_MODE) {
    case true:
      //
      StripeCheckoutProvider.defaults({key: NOODLIO_PAY_CHECKOUT_KEY['test']});
      break
    default:
      //
      StripeCheckoutProvider.defaults({key: NOODLIO_PAY_CHECKOUT_KEY['live']});
      break
  };

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  // Each tab has its own nav history stack:
  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/example.html',
    controller: 'DashCtrl',
    resolve: {
      // checkout.js isn't fetched until this is resolved.
      stripe: StripeCheckoutProvider.load
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dash');

});
