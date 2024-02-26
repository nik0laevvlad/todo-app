# First project run

1. Install .net 6 SDK
2. Install Node.js
3. Run `dotnet tool install --global dotnet-ef --version 7.*`
4. Run `npm install -g yarn`

Go to TodoApp.Api\
Run `dotnet ef database update`

Go to ClientApp\
Run `yarn`

To start project:
1. Start TodoApp.Api
2. go to ClientApp folder and run `yarn start`

Open [http://localhost:3000/todo-app](http://localhost:3000/todo-app) to view it in the browser.
