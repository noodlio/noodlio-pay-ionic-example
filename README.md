Noodlio Pay is an easy, straightforward solution for accepting payments on your website, in your app, or elsewhere on the web. Thanks to the REST setup, your application can immediately start making requests to the API, which validates input and charges your clients for their purchases. As we are using Stripe, all funds will immediately be transferred to your account.

Essentially, Noodlio Pay replaces your server-side, saving you the time to learn a new server language, test, validate and so on the server-side for your payments. In other words, it's hassle-free payment!

# Key benefits:

- **It's quick**: You can have a working payment server set up within a few minutes.
- **No server-side setup needed**: Simply send `HTTP POST` requests to the Noodlio Pay API from the client-side and we'll do the rest for you.
- **Cost efficient**: Hosting a complete server-side 24/7 can be a costly undertaking. This won't be a worry anymore: because the Noodlio Pay server is already hosted for you, you don't have to spend money on unused server capacity.
- **Instantaneous**: Thanks to the Stripe setup, you'll see the funds transferred immediately to your Stripe Account
- **Unlimited**: There are no restrictions on the number of requests that you can send through the Noodlio Pay server.
- **Broad support**: You can charge your customers with any client-side language through `HTTP POST` requests (for instance `Angular`, `React`, `Javascript`, etc.). In addition, we support dedicated languages such as `CURL`, `Java`, `NodeJS`, `PHP`, `Python`, `Objective-C`, `Ruby` and `.NET`.
- **Tested, pre-configured and maintained**: Our team is constantly monitoring, testing and updating the server to conform to the latest developments.
- **Secure**: Our servers are secure and we never store any transaction data.

# How it works

## 0. Get your unique Stripe Account ID

To use the API, you'll first need to [have a  Stripe account](https://www.stripe.com). After that, you'll need to retrieve your unique Stripe Account ID (field: `stripe_account`), which you can obtain on the following page after connecting with Noodlio Pay (you'll only need to do this once per mode):

For the production mode:
[https://www.noodl.io/pay/connect](https://www.noodl.io/pay/connect)

For the development mode:
[https://www.noodl.io/pay/connect/test](https://www.noodl.io/pay/connect/test)

## 1. Obtain the Stripe token (`source`)

To charge your client, first obtain a Stripe Token (`source`) to validate the users' credit card details. There are two options for this process:

**Option 1: Use the Noodlio Pay API**

Send a `HTTP POST` request with the credit card details (`number`, `cvc`, `exp_month` and `exp_year`) to the route [`/tokens/create`](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe#tokens-create). Read more in the [documentation](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe#tokens-create).

**Option 2: Use Stripe's native Checkout form**

The Checkout form is an embeddable payment form for desktop, tablet, and mobile devices. It works within your site: customers can pay instantly, without being redirected to complete the transaction.

Here are some guides/tutorials on how to embed the Checkout form in your application: [Ionic/Angular](https://github.com/noodlio/noodlio-pay-ionic-example), [Sinatra](https://stripe.com/docs/checkout/sinatra), [Rails](https://stripe.com/docs/checkout/rails), [Flask](https://stripe.com/docs/checkout/flask), and [PHP](https://stripe.com/docs/checkout/php)

## 2. Charge the client

Once you have obtained the token (`source`), you can proceed with charging your user by sending the token, along with the `amount`, `description` (optional), `currency` and `stripe_account` through a `HTTP POST` request to the route [`/charge/token`](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe#charge-token). Read more in the [documentation](https://market.mashape.com/noodlio/noodlio-pay-smooth-payments-with-stripe#charge-token)

## Examples

The following examples are currently available:

- [Ionic/Angular](https://github.com/noodlio/noodlio-pay-ionic-example)

If you have implemented your own template/starter/tutorial with this API and would like to list it here, please [let us know](mailto:noodlio@seipel-ibisevic.com) and you can receive an award.

# Pricing
There are three options for using the API:

If you expect to incur a fluctuating amount of transactions, we recommend that you opt for one of the transaction-based schemes:

- **Starter pack**: No license fee. A 5% transaction fee is applied each time a customer is charged.
- **Intermediate pack**: One-off licence fee of $489. A 2.5% transaction fee is applied each time a customer is charged.

If you expect to incur a significant amount of transactions, we recommend that you opt for a full licence:

- **Pro pack**: One-off license fee of $989. No transaction fee is applied.

*Note: Stripe may apply an additional fee of +- 2% per transaction (see: [Stripe Fees](https://stripe.com/pricing))*
