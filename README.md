# binance-registration-check

Lambda function to check if registration is open on binance.com.  Results are posted to [Telegram channel](https://t.me/binancecheck).

## How to use:
1. Download a copy of this repository
2. Modify index.js
    1. Replace 'token' with your Telegram bot token
    2. Replace 'chatId' with your Telegram Chat ID
3. Create a new Lambda function
4. Upload this repo to the Lambda function
5. Create Cloud Watch rule to execute Lambda function on a schedule
