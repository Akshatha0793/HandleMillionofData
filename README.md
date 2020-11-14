# HandleMillionofData

This application is developed using react and node. 

In the react we have a textbox, where when we enter a letter a query is made to the database and the reusult is fetched. 
Made use of pagination and data is fetched in batches to handle mutliple data. 

For example, a limit has been set so that only a limited data can be displayed on the screen. This will help us in smooth fetching of data and not create any problems in the future. A skip is also mentioned so that it fetches new set of data for every fetch. Fetch is set based on the limit.

In future:

We can make use of redis to cache the frequently accessed data.

