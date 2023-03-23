This is sample with advanced nest.js infrastructure setup based on Clean architecture.
All operations are read-only, no create/update/delete actions.

Domain features that are implemented in this sample:
- Regular veterinary activities represented (read-only actions)

Techniques: 
- Advanced DBContext provided
- Dependency injection

Tools: 
- Nest.js
- TypeORM
- Swagger

Architectural idea:
Each domain action is represented as separate class with its implementation. Each implementation wrapped into DB transaction out of box. 
New version of TypeORM (with major breaking changes) is used. Better application configuration management is used. Validation for application configuration is used. Application configuration is separated into separate module.
Separate module for database management is created as well.