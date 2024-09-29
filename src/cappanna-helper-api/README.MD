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

- [.NET Core 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [EF Tools 8.0](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

## Running the tests

`dotnet test`

All tests should pass.

## Running migrations

Install EF tool: `https://learn.microsoft.com/en-us/ef/core/cli/dotnet`.
Use `dotnet tool update --global dotnet-ef` to update.

Add migration: `dotnet ef migrations add <migration_name> --project .\CappannaHelper.Api\`
Run migrations: `dotnet ef database update`

## Built With

- [.NET Core 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [SQLite](https://www.sqlite.org/) - Persistence
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/#pivot=efcore) - ORM
- [xUnit](https://xunit.github.io/) - Tests
