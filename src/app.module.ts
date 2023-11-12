import { InternalServerErrorException, Module } from '@nestjs/common';
import { UserResource } from './users/user.resource';
import { AppController } from './app.controller';
import { AppService } from './app.service';

Promise.resolve()
  .then(async () => {
    const AdminJSSequelize = await import('@adminjs/sequelize');
    const AdminJS = (await import('adminjs')).default;
    const { Resource, Database } = AdminJSSequelize;

    AdminJS.registerAdapter({ Resource, Database });
  })
  .catch((error) => {
    throw new InternalServerErrorException(error);
  });

// const DEFAULT_ADMIN = {
//   email: 'kasra@example.com',
//   password: 'password',
// };

// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };

@Module({
  imports: [
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    import('@adminjs/nestjs').then(async ({ AdminModule }) => {
      const { dark, light, noSidebar } = await import('@adminjs/themes');
      return AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            defaultTheme: light.id,
            availableThemes: [dark, light, noSidebar],
            rootPath: '/admin',
            resources: [UserResource],
            branding: {
              logo: 'https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png',
              companyName: 'Recruiter',
              withMadeWithLove: false,
              favicon:
                'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
            },
          },
          // auth: {
          //   authenticate,
          //   cookieName: 'adminjs',
          //   cookiePassword: 'secret',
          // },
          // sessionOptions: {
          //   resave: true,
          //   saveUninitialized: true,
          //   secret: 'secret',
          // },
        }),
      });
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
