# Instructions
- Clone the file
- Find your project name in /src/db/config/database.json, and in package.json
- Run `$ npm install`
- Run `$ npx sequelize-cli db:create`
- Run `$ npx sequelize-cli db:migrate`
- Run `$ npx sequelize-cli db:seed:all`
- Add `.env` with the following (SECRET_COOKIE_PASSWORD must be at least 32 characters long)
  ```
  SECRET_COOKIE_PASSWORD=[Something Random]
  DATABASE_URL=postgresql://@127.0.0.1/[your_project_name_here]_development?statusColor=686B6F&enviroment=local&name=[your_project_name_here]_development&tLSMode=0&usePrivateKey=false&safeModeLevel=0&advancedSafeModeLevel=0
  ```

Open the .env.example file
