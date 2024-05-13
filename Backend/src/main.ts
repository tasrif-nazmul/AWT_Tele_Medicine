// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";

// async function bootstrap() {
//   // const app = await NestFactory.create(AppModule);
//   const app = await NestFactory.create(AppModule, { cors: true });
//   await app.listen(3000);
//   app.enableCors();
// }
// bootstrap();




// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// // import session from "express-session";
// import * as session from "express-session";

// async function bootstrap() {
//   // const app = await NestFactory.create(AppModule);
//   const app = await NestFactory.create(AppModule);
//   app.use(
//     session({
//         secret: 'my-secret',
//         resave: false,
//         saveUninitialized: false,
//         cookie:{
//           secure: false,
//           httpOnly: false,
//           maxAge: 300000
//         }
//     }),
//   );
//   await app.listen(3000);
//   app.enableCors({
//     origin: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
//   });
// }
// bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable sessions
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie:{
        secure: false,
        httpOnly: false,
        maxAge: 300000
      }
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
