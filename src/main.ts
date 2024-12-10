import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// -------------------------------------------------------------------------

// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { errorInterceptor } from './app/app.interceptor';

// bootstrapApplication(AppComponent, appConfig);
