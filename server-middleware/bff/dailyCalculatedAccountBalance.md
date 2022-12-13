# API Endpoint for Calculating Account Balance
This API endpoint calculates the value of a user's portfolio over a specified number of days or months. The endpoint uses the following steps:

1. Set the current date as today and create an empty array dates
2. Create n dates backwards from today and add them to the dates array
3. Create a dataset object with the dates and corresponding amounts by iterating over the input data and adding the quantities for each date
4. Accumulate the amounts for each date by adding the current value to the accumulated amount and storing the result in the dataset
5. Add empty days for missing dates by iterating over the dates array and adding a value of 0 for each missing date
6. Return the calculated portfolio value for the specified number of days or months

The API endpoint can be accessed using the following URL:

`GET /calculatedAccountBalance`
The endpoint requires the following headers to be provided:

- url: The URL of the Supabase API
- token: The API token for the Supabase API
- user_id: The ID of the user for whom to calculate the portfolio value


The endpoint supports the following query parameters:
days: The number of days for which to calculate the portfolio value
months: The number of months for which to calculate the portfolio value


The endpoint will return a JSON object with the calculated portfolio value for the specified number of days or months.

### Example usage:

`GET /calculatedAccountBalance?user_id=<uuid>?days=4`
This request will return the calculated portfolio value for the last 4 days.

Example response:
```
[
    {
        "date": "2022-12-11",
        "amount": 250
    },
    {
        "date": "2022-12-10",
        "amount": 200
    },
    {
        "date": "2022-12-09",
        "amount": 300
    },
    {
        "date": "2022-12-08",
        "amount": 300
    }
]
```