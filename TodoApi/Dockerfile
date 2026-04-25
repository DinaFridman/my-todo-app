# שלב בנייה
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# העתקת הקוד מתוך התיקייה הנוכחית לתוך ה-Docker
COPY . .

# הרצת פקודות הבנייה בצורה מפורשת על קובץ הפרויקט
RUN dotnet restore "TodoApi.csproj"
RUN dotnet publish "TodoApi.csproj" -c Release -o /app/publish

# שלב הרצה
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# פקודה להרצת האפליקציה
ENTRYPOINT ["dotnet", "TodoApi.dll"]