FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CappannaHelper.Tenant/CappannaHelper.Tenant.csproj", "CappannaHelper.Tenant/"]
RUN dotnet restore "CappannaHelper.Tenant/CappannaHelper.Tenant.csproj"
COPY . .
WORKDIR "/src/CappannaHelper.Tenant"
RUN dotnet build "CappannaHelper.Tenant.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CappannaHelper.Tenant.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CappannaHelper.Tenant.dll"]