@echo off

dotnet ef database drop -f
type NUL > Persistence/CappannaHelper.db
dotnet ef migrations remove
dotnet ef migrations add All
dotnet ef database update