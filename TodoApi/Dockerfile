# שלב 1: בנייה
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# העתקה של הכל פנימה
COPY . .
RUN dotnet restore "TodoApi.csproj"
RUN dotnet publish "TodoApi.csproj" -c Release -o /app/publish

# שלב 2: הרצה
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# פקודת הרצה - ודאי ששם ה-DLL שלך הוא אכן TodoApi.dll
ENTRYPOINT ["dotnet", "TodoApi.dll"]