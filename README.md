# Noodlio Pay - Smooth Payments with Stripe

Noodlio Pay is an easy, straightforward solution for accepting payments on your website, in your app, or elsewhere on the web. Thanks to the REST setup, your application can immediately start making requests to the API, which validates input and charges your clients for their purchases. As we are using Stripe, all funds will immediately be transferred to your account.

Essentially, Noodlio Pay replaces your server-side, saving you the time to learn a new server language, test, validate and so on the server-side for your payments. In other words, it's hassle-free payment!

<img src="http://www.seipel-ibisevic.com/assets-external/noodlio-pay/banner.png">

**This template** pack consists of two examples (with and without Stripe Checkout.js) that illustrate how to consume the API on the client-side with Ionic/Angular.

**Functionalities** include:

- Validate Credit Card Details
- Retrieve a StripeToken for the Transaction
- Customize the meta data and image
- Charge the user by sending a HTTP Post request to the [Noodlio Pay API](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe)
- Two starter apps  which can be easily configured following the Ionic Documentation

# Try it out
You can try out the Checkout example on your phone with Ionic View. Please [download it from here](https://view.ionic.io), sign in and enter the following app ID: **b8b71a84**.

# Key benefits

- **It's quick**: You can have a working payment server set up within a few minutes.
- **No server-side setup needed**: Simply send `HTTP POST` requests to the Noodlio Pay API from the client-side and we'll do the rest for you.
- **Cost efficient**: Hosting a complete server-side 24/7 can be a costly undertaking. This won't be a worry anymore: because the Noodlio Pay server is already hosted for you, you don't have to spend money on unused server capacity.
- **Instantaneous**: Thanks to the Stripe setup, you'll see the funds transferred immediately to your Stripe Account
- **Unlimited**: There are no restrictions on the number of requests that you can send through the Noodlio Pay server.
- **Broad support**: You can charge your customers with any client-side language through `HTTP POST` requests (for instance `Angular`, `React`, `Javascript`, etc.). In addition, we support dedicated languages such as `CURL`, `Java`, `NodeJS`, `PHP`, `Python`, `Objective-C`, `Ruby` and `.NET`.
- **Tested, pre-configured and maintained**: Our team is constantly monitoring, testing and updating the server to conform to the latest developments.
- **Secure**: Our servers are secure and we never store any transaction data.

# How it works

## 0. Stripe and Mashape Setup

We first need to define a couple of constants in our app. If you are working with Angular/Ionic `v1.x`, head over to `app.js` and you'll see the following:

```
// Stripe Payments API
// Obtain from:
// - https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe
var NOODLIO_PAY_API_URL         = "https://noodlio-pay.p.mashape.com";
var NOODLIO_PAY_API_KEY         = "<YOUR-MASHAPE-API-KEY>";

// Stripe Account
// Connect on both:
// - https://www.noodl.io/pay/connect and
// - https://www.noodl.io/pay/connect/test
var STRIPE_ACCOUNT_ID           = "<YOUR-STRIPE-ACCOUNT-ID>"

// Define whether you are in development mode (TEST_MODE: true) or production mode (TEST_MODE: false)
var TEST_MODE = false;
```

The `NOODLIO_PAY_API_URL` is basically the location of the server and is fixed. The variable `TEST_MODE` simply takes the values `true` or `false` and defines whether we are in test mode (development) or production (actually charging the user). Now let's define two constants:

**Mashape**

To consume the Stripe Payments API, we'll need to obtain our unique `NOODLIO_PAY_API_KEY`. To do so, head over to [Mashape](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe) and click on the right "Get your API Keys and Start Hacking" or press on "Sign up free".

[<img src="http://noodlio-templates.firebaseapp.com/noodlio-pay/img/mashape-api-keys.png">](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe)

After you are signed in, you'll find your unique API Key in the request example on the [Stripe Payments API page](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe):

```
curl -X POST --include 'https://noodlio-pay.p.mashape.com/charge/token' \
  -H 'X-Mashape-Key: <YOUR-MASHAPE-API-KEY>' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json' \
  ... other values
```

Replace the `NOODLIO_PAY_API_KEY` with this unique identifier.

**Stripe Account**

If you haven't already [sign up for a Stripe Account](https://www.stripe.com). After that, you'll need to retrieve your unique Stripe Account ID (field: `stripe_account`), which you can obtain on the following pages (Note: you'll need to visit both links once):

- For the production mode:
[https://www.noodl.io/pay/connect](https://www.noodl.io/pay/connect)
- For the development mode:
[https://www.noodl.io/pay/connect/test](https://www.noodl.io/pay/connect/test)

The Stripe Account ID looks something like `acct_12abcDEF34GhIJ5K`. Replace the constant `STRIPE_ACCOUNT_ID` wherever you have defined it.

That's it. Our server is configured and ready to receive payments.

## 1. Obtain the Stripe token (`source`)

To charge your client, first obtain a Stripe Token (`source`) to validate the users' credit card details. There are two options for this process:

**Option 1: Use the Noodlio Pay API**

Send a `HTTP POST` request with the credit card details (`number`, `cvc`, `exp_month` and `exp_year`) to the route [`/tokens/create`](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe#tokens-create). Read more in the [documentation](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe#tokens-create).

The use of this option is illustrated in the folder `example-regular`.

**Option 2: Use Stripe's native Checkout form**

The Checkout form is an embeddable payment form for desktop, tablet, and mobile devices. It works within your site: customers can pay instantly, without being redirected to complete the transaction.

The use of this option is illustrated in the folder `example-checkout`

Some alternative guides/tutorials (in other languages) on how to embed the Checkout form in your application: [Ionic/Angular](https://github.com/noodlio/noodlio-pay-ionic-example), [Sinatra](https://stripe.com/docs/checkout/sinatra), [Rails](https://stripe.com/docs/checkout/rails), [Flask](https://stripe.com/docs/checkout/flask), and [PHP](https://stripe.com/docs/checkout/php)

## 2. Charge the client

Once you have obtained the token (`source`), you can proceed with charging your user by sending the token, along with the `amount`, `description` (optional), `currency` and `stripe_account` through a `HTTP POST` request to the route [`/charge/token`](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe#charge-token). Read more in the [documentation](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe#charge-token)

The examples in these templates illustrate the use of this process in `ExampleCtrl` (file `example-regular/www/js/app.js`) and in the factory `StripeCharge` (file `example-checkout/www/js/services.js`)

# Pricing

The use of the API hosted on Mashape is free and you can make unlimited requests. [**Click here for an overview of complementary licenses**](https://www.noodl.io/pay/plans)

# FAQ and Troubleshooting

## Packaging and Whitelisting

If you're using a newer version of Cordova (or the latest Ionic CLI) to develop your app, you may be experiencing http 404 errors when your app tries to make network requests. The [fix is to whitelist](http://docs.ionic.io/docs/cordova-whitelist) a couple of domains that make those http requests:

```
https://checkout.stripe.com
https://noodlio-pay.p.mashape.com
```

Example of the error you might encounter:

```
> Uncaught SecurityError: Blocked a frame with origin https://checkout.stripe.com
```

## Building for Android

When building the example `example-checkout` for Android, one might encounter the following error:

```
> Execution failed for task ':processDebugResources'.
> com.android.ide.common.process.ProcessException: org.gradle.process.internal.ExecException: Process 'command 'C:\Program Files (x86)\AndroidSDK\build-tools\23.0.2\aapt.exe'' finished with non-zero exit value 1
```

To solve for this issue, please remove the `*.GZ` file inside the bower package.

# Other questions or suggestions

Feel free to drop an email to `noodlio at seipel-ibisevic . com`. We love to hear from you!
