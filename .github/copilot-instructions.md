### Purpose
This repo is an Angular 16 SPA that uses Firebase (AngularFire compat), lazy-loaded feature modules, and role-based routing. The document below highlights conventions, important architecture points, and quick actionable examples to help AI coding agents be immediately productive.

### Quick start (commands)
- Install dependencies: `npm install`
- Dev server: `npm start` (runs `ng serve`)
- Build: `npm run build` (runs `ng build`)
- Tests: `npm test` (Karma/Jasmine)
- Local API proxy: configured in `proxy.conf.json` (used by `ng serve --proxy-config` if needed)

### Big-picture architecture
- Root app is in `src/app`. The app uses a main `AppModule` and lazy-loaded feature modules under `src/app` (e.g. `admin`, `client`, `calendar`, `task`). See routing in [src/app/app-routing.module.ts](src/app/app-routing.module.ts).
- Authentication and session management are handled by `AuthenticationService` which uses `@angular/fire/compat` and `sessionStorage` for `currentUser` and `currentUserData`. See [src/app/_services/authentication.service.ts](src/app/_services/authentication.service.ts) for token initialization, `initialize()` and `login()` flow.
- Role-based access: `AuthGuard` + `Role` model are used; some roles trigger a role-selection modal (`RoleChoiceModalComponent`) that affects navigation. Check [src/app/app-routing.module.ts](src/app/app-routing.module.ts) and [src/app/admin/role-choice-modal](src/app/admin/role-choice-modal).

### Important integrations
- Firebase / AngularFire: initialized with `environment_A` in `AppModule` (see [src/app/app.module.ts](src/app/app.module.ts)). Environments with Firebase configs are in `src/environments/` (e.g. `environment.development.ts`).
- HTTP interceptors: JWT and error interceptors are registered in `AppModule` (`core/interceptor`). Review `JwtInterceptor` and `ErrorInterceptor` when changing API auth flows.
- Hash routing: `HashLocationStrategy` is enabled in `AppModule` — routing uses a hash (#) by default.

### Project-specific conventions & patterns
- Path aliases: `tsconfig.json` sets `baseUrl: "src"` and aliases such as `@core`, `@shared`, `@config`. Prefer these aliases for imports (example: `import { CoreModule } from '@core';`). See [tsconfig.json](tsconfig.json).
- Service file naming: many services live in `src/app/_services` and use camelCase file names (e.g. `userRole.service.ts`, `authentication.service.ts`). Follow existing casing when adding services to keep imports consistent.
- Session state: `sessionStorage` is the canonical place for `currentUser` and `currentUserData` (not a global store). Avoid duplicate sources of truth; use `AuthenticationService.getData()` and `currentUser` observable.
- Encryption: `AuthenticationService` uses `crypto-js` with a project-specific `secretKey` string. Be cautious when modifying encryption/decryption logic; tests or integrations may depend on that format.

### Where to change behavior safely
- To change routing or add pages, place feature modules in `src/app/<feature>` and register them as lazy-loaded in `app-routing.module.ts`.
- To change Firebase credentials, edit the environment files in `src/environments` (used by `AngularFireModule.initializeApp`).
- To modify HTTP behavior (headers, logging), update interceptors in `src/app/core/interceptor` and confirm `provideHttpClient(withInterceptorsFromDi())` usage in `AppModule`.

### Tests and CI hints
- Unit tests run with `npm test`. There are example spec files next to services (e.g. `share-time-difference-in-minutes.service.spec.ts`).
- Build artifact expected by firebase hosting: `dist/main` per `firebase.json`.

### Minimal examples for common tasks
- Add a new service using path alias and provided DI: create `src/app/_services/my-new.service.ts`, export `@Injectable({ providedIn: 'root' })` and import using `import { MyNewService } from '@app/_services/my-new.service'` or a relative path consistent with `baseUrl: 'src'`.
- Read current user in a component:
  - inject `AuthenticationService`, subscribe to `currentUser` or call `getData()`; prefer `currentUser` observable for reactive updates.

### Do NOT assume
- API backend is not included — check proxy or environment for endpoints. Do not hardcode production Firebase credentials; use `src/environments/*`.
- Tests or CI scripts beyond `npm test` / `ng build` are not present unless added.

### Key files to inspect when modifying behavior
- App bootstrap and globals: [src/app/app.module.ts](src/app/app.module.ts)
- Routes & lazy modules: [src/app/app-routing.module.ts](src/app/app-routing.module.ts)
- Authentication flow: [src/app/_services/authentication.service.ts](src/app/_services/authentication.service.ts)
- Path aliases: [tsconfig.json](tsconfig.json)
- Firebase environments: [src/environments/environment.development.ts](src/environments/environment.development.ts)

If any of this is unclear or you want more examples (e.g., how to add a new lazy route, how to change the auth flow, or where tests live), tell me which area to expand and I'll update this file.
