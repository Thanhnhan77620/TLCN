#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-nanoserver-1903 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-nanoserver-1903 AS build
WORKDIR /src
COPY ["ExamToeicOnline-BackEnd-Clients/ExamToeicOnline-BackEnd-Clients.csproj", "ExamToeicOnline-BackEnd-Clients/"]
RUN dotnet restore "ExamToeicOnline-BackEnd-Clients/ExamToeicOnline-BackEnd-Clients.csproj"
COPY . .
WORKDIR "/src/ExamToeicOnline-BackEnd-Clients"
RUN dotnet build "ExamToeicOnline-BackEnd-Clients.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ExamToeicOnline-BackEnd-Clients.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ExamToeicOnline-BackEnd-Clients.dll"]