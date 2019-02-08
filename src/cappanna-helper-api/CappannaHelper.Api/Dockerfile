FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY CappannaHelper.Api/CappannaHelper.Api.csproj CappannaHelper.Api/
COPY CappannaHelper.Printing/CappannaHelper.Printing.csproj CappannaHelper.Printing/
RUN dotnet restore CappannaHelper.Api/CappannaHelper.Api.csproj
COPY . .
WORKDIR /src/CappannaHelper.Api
RUN dotnet build CappannaHelper.Api.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish CappannaHelper.Api.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CappannaHelper.Api.dll"]
