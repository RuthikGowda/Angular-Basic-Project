# CRUDBasicProj

## YouTube video to learn github command and flow
```bash
https://www.youtube.com/watch?v=vA5TTz6BXhY
```


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## progresive Bar
step 1: npm install @ngx-loading-bar/core @ngx-loading-bar/router @ngx-loading-bar/http-client

step 2: Import in app.module.ts :
        
        import { LoadingBarModule } from '@ngx-loading-bar/core';
        import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
        import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';


        @NgModule({
                 imports: [
                 LoadingBarModule,
                    LoadingBarRouterModule , LoadingBarHttpClientModule
                     ]
            })
        export class AppModule {}

Step 3: Add the progress bar to app.component.html


        <ngx-loading-bar color="#ff0000" height="3px"></ngx-loading-bar>
            <router-outlet></router-outlet>


## Phone Number Input with country code (ngx-intl-tel-input)
    https://www.npmjs.com/package/ngx-intl-tel-input

## issue : when trying to push and permission issue
step 1
    Open Credential Manager (search in Start menu)
    Go to Windows Credentials
    Remove any credentials related to github.com

step 2
    try to push in terminal, it will ask to login use ur main gitub account
