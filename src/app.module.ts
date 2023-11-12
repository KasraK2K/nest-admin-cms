import { InternalServerErrorException, Module } from '@nestjs/common';
import { UserResource } from './admin/resources/users/user.resource';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import uploadFeature from '@adminjs/upload';

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

@Module({
  imports: [
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
        }),
      });
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
