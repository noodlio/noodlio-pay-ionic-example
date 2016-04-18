angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, StripeCharge) {

  $scope.ProductMeta = {
    title: "Awesome product",
    description: "Yes it really is",
    priceUSD: 1,
  };

  $scope.status = {
    loading: false,
    message: "",
  };

  $scope.charge = function() {

    $scope.status['loading'] = true;
    $scope.status['message'] = "Retrieving your Stripe Token...";

    // first get the Stripe token
    StripeCharge.getStripeToken($scope.ProductMeta).then(
      function(stripeToken){
        // -->
        proceedCharge(stripeToken);
      },
      function(error){
        console.log(error)

        $scope.status['loading'] = false;
        if(error != "ERROR_CANCEL") {
          $scope.status['message'] = "Oops... something went wrong";
        } else {
          $scope.status['message'] = "";
        }
      }
    ); // ./ getStripeToken

    function proceedCharge(stripeToken) {

      $scope.status['message'] = "Processing your payment...";

      // then chare the user through your custom node.js server (server-side)
      StripeCharge.chargeUser(stripeToken, $scope.ProductMeta).then(
        function(StripeInvoiceData){
          $scope.status['loading'] = false;
          $scope.status['message'] = "Success! Check your Stripe Account";
          console.log(StripeInvoiceData)
        },
        function(error){
          console.log(error);

          $scope.status['loading'] = false;
          $scope.status['message'] = "Oops... something went wrong";
        }
      );

    }; // ./ proceedCharge

  };

})
