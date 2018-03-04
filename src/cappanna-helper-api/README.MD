# Cappanna Helper Api
This is the API projects collector.  
Here you will find different projects including REST API, printing system (currently only Esc/Pos is supported) and relative tests.

## Getting Started
```
git clone https://gitlab.com/andrea.pierangeli/cappanna-helper.git
cd cappanna-helper\src\cappanna-helper-api
dotnet build cappanna-helper-api.sln
```

Then, you can launch the compiled dll using `dotnet` command line tool or start debuggin with your favorite IDE.

### Prerequisites
* .NET Core 2.0+ ([SDK](https://www.microsoft.com/net/download/core#/sdk) + [Runtime](https://www.microsoft.com/net/download/core#/runtime))

## Running the tests
```
cd cappanna-helper-api-tests
dotnet test
```
All tests should pass.

## Built With
* [.Net Core 2.0](https://www.microsoft.com/net)
* [SQLite](https://www.sqlite.org/) - Persistence
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/#pivot=efcore) - ORM
* [xUnit](https://xunit.github.io/) - Tests
