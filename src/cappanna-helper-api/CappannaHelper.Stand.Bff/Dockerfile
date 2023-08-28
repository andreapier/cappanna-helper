#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CappannaHelper.Stand.Bff/CappannaHelper.Stand.Bff.csproj", "CappannaHelper.Stand.Bff/"]
RUN dotnet restore "CappannaHelper.Stand.Bff/CappannaHelper.Stand.Bff.csproj"
COPY . .
WORKDIR "/src/CappannaHelper.Stand.Bff"
RUN dotnet build "CappannaHelper.Stand.Bff.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CappannaHelper.Stand.Bff.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CappannaHelper.Stand.Bff.dll"]