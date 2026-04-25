# שלב בנייה
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# העתקה של כל הפרויקט (כולל תיקיית TodoApi)
COPY . .

# הרצה מתוך תיקיית המשנה
RUN dotnet restore "TodoApi/TodoApi.csproj"
RUN dotnet publish "TodoApi/TodoApi.csproj" -c Release -o /app/publish

# שלב הרצה
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "TodoApi.dll"]