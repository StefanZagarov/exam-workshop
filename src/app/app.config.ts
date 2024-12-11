import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './app.interceptor';
import { UserService } from './user/user.service';

function initializeApp(userService: UserService): () => Promise<void>
{
  return () => userService.initializeUserData();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => initializeApp(userService),
      deps: [UserService],
      multi: true
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
};
