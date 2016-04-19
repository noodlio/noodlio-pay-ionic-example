
# How to update your Stripe template to V2 (Noodlio Pay)

If you have previously downloaded Stripe Charge / Stripe Payments Kit from either Ionic Market or [Noodlio](https://www.noodl.io), then follow these instructions to update your template to the latest Noodlio Pay API. You can read more about Noodlio Pay [here](https://www.noodl.io/market/product/P201604181926406/noodlio-pay-smooth-payments-with-stripe-accept-payments-without-a-server-side-setup).

## Step 1: Connect your account to Noodlio Pay and obtain your Stripe Account ID

Please visit the following links:

- Production mode:
[https://www.noodl.io/pay/connect](https://www.noodl.io/pay/connect)
- Development mode:
[https://www.noodl.io/pay/connect/test](https://www.noodl.io/pay/connect/test)

Your unique Stripe Account ID will look something like this:

```
acct_12abcDEF34GhIJ5K
```

## Step 2: Replace the constants in `app.js`

At the top of the file app.js, you'll find the following constants:

```
// remove this
var SERVER_SIDE_URL             = "<SERVER_SIDE_URL>";
var STRIPE_API_PUBLISHABLE_KEY  = "<STRIPE_API_PUBLISHABLE_KEY>";
```

With the new Noodlio Pay API, we don't need this anymore. So remove those lines of code.

## Step 3: Add the new constants

At the place where you removed the constants in **Step 2**, add the following lines of code:

```
// These are fixed values, do not change this
var NOODLIO_PAY_API_URL         = "https://noodlio-pay.p.mashape.com";
var NOODLIO_PAY_API_KEY         = "3fEagjJCGAmshMqVnwTR70bVqG3yp1lerJNjsnTzx5ODeOa99V";
var NOODLIO_PAY_CHECKOUT_KEY    = {test: "pk_test_QGTo45DJY5kKmsX21RB3Lwvn", live: "pk_live_ZjOCjtf1KBlSHSyjKDDmOGGE"};

// Obtain your unique Stripe Account Id from here:
// https://www.noodl.io/pay/connect
var STRIPE_ACCOUNT_ID           = "<YOUR-UNIQUE-ID>";

// Define whether you are in development mode (TEST_MODE: true) or production mode (TEST_MODE: false)
var TEST_MODE = true;
```

And now, make sure to add replace `<YOUR-UNIQUE-ID>` with your Stripe Account Id obtained in **Step 1**.

## Step 4: Update the config with the new environments

In the file `app.js`, head over to the part that starts with `.config` and specifically **remove** the following lines of code:

```
// Define your STRIPE_API_PUBLISHABLE_KEY
StripeCheckoutProvider.defaults({key: STRIPE_API_PUBLISHABLE_KEY});
```

and **replace** it with:

```
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
```


## Step 5: Update the factory `StripeCharge`

Head over to your `services.js` (or wherever you have the factory `StripeCharge`). Add the following line of code at the top of the factory (after the line `var self = this`):

```
// do not add this (just as an illustration)
.factory('StripeCharge', function($q, $http, StripeCheckout) {
  var self = this;

  // add only this
  $http.defaults.headers.common['X-Mashape-Key']  = NOODLIO_PAY_API_KEY;
  $http.defaults.headers.common['Content-Type']   = 'application/x-www-form-urlencoded';
  $http.defaults.headers.common['Accept']         = 'application/json';

  // ...
```

## Step 6: Replace `self.chargeUser()`

Replace `self.chargeUser()` in the factory `StripeCharge` with the following lines of code:

```
self.chargeUser = function(stripeToken, ProductMeta) {
    var qCharge = $q.defer();

    // this has changed
    var chargeUrl = NOODLIO_PAY_API_URL + "/charge/token";

    // this is new (previously curlData)
    var param = {
      source: stripeToken,
      amount: Math.floor(ProductMeta.priceUSD*100), // amount in cents
      currency: "usd",
      description: "Your custom description here",
      stripe_account: STRIPE_ACCOUNT_ID,
      test: TEST_MODE,
    };

    // the first line here has changed
    $http.post(NOODLIO_PAY_API_URL + "/charge/token", param)
    .success(
      function(StripeInvoiceData){
        qCharge.resolve(StripeInvoiceData);
        // you can store the StripeInvoiceData for your own administration
      }
    )
    .error(
      function(error){
        console.log(error)
        qCharge.reject(error);
      }
    );
    return qCharge.promise;
  };
```

# That's it, you're done

You should be able to receive payments now with the new Noodlio Pay API. If you are having troubles or issues, please send us an email at `noodlio@seipel-ibisevic.com` with your files and we can always make the changes for you.

Take care, the Noodlio Team
