# LifTracer
*Angular 14 with Material*

## JWT auth
`Issuer` and `Audience` are set using https://generate.plus/en/base64.

## DB Migrations
In Debug configuration there are unit tests located with their units,
so EF commands must be run with Release configuration.
```cmd
dotnet ef ... --configuration=Release
```