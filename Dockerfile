# NuGet restore
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

FROM node:12

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
COPY --from=build /app/out .


# heroku uses the following
CMD ASPNETCORE_URLS=http://*:$PORT dotnet MovieMash.dll


