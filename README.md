<img src="https://ka.lt/images/github/intro.svg" alt="" width="100%" height="auto">

<img alt="Licence: MIT" src="https://ka.lt/images/github/shield-licence.svg"> <img alt="" src="https://img.shields.io/website?style=flat-square&down_message=offline&up_message=online&url=https%3A%2F%2Fka.lt"> <img alt="" src="https://img.shields.io/uptimerobot/ratio/m794185416-8ffeb1920e5dc9f7c754d4d3?style=flat-square"> <img alt="" src="https://img.shields.io/github/last-commit/justchrister/kalt?style=flat-square"> <img alt="" src="https://img.shields.io/github/commit-activity/m/justchrister/kalt?style=flat-square">

<h1>Kalt — Make money, make a difference</h1>

Kalt is a startup building a vertically integrated fossil-free energy generator and exchange that lets anyone invest directly in fossil free energy generation, and earn direct dividends from it. 

## Backend
<img src="https://ka.lt/images/github/architecture.svg" alt="" width="100%" height="auto">

### Ledger
The backend leverages Supabase (postgres) as a append-only ledger and message queue to enable seamless communication between the microservices. All data is appended to tables where entities are immutable, and most data is read from these _ledgers_/topics directly from super simple functions. Such as `get().user()`.

For services or integrations that require state—which are rare cases—this message queue system implements a publish-subscribe pattern where other services can subscribe to these _ledgers_/topics to consume the messages. The quality of the message contents are ensured through interfaces and types, that are implemented in Postgres and the Nuxt. 

- Decoupling of services, allowing for independent scaling and easy maintenance.
- Improved fault tolerance, as services can continue to function even if some other services fail.
- Enhanced extensibility, as new services can be easily added to the system without affecting existing services.

### Microservices
Nuxt Microservices (APIs hosted on Vercel)
The project consists of multiple Nuxt microservices hosted on Vercel, each responsible for a specific functionality. These microservices expose APIs to interact with the frontend and other services. The microservices have their own state databases, which are hosted on Supabase.

- Modular design, making it easy to understand, develop, and maintain individual services.
- Flexibility to develop and deploy each service independently, reducing the risk of introducing bugs or causing downtime.
- Better resource utilization, as each service can be scaled independently based on its own requirements.

### message composable


## Frontend
<img src="https://ka.lt/images/github/grids.svg" alt="" width="100%" height="auto">

Using the Nuxt framework lets us get the best of both reactive web applications and server-side rendered ones, the navigation is blazing fast, will still having reactive elements. 

The site leverages clamp(MIN, VAL, MAX) for the sizing of all the elements and components, which mean the 

in order to be auto-responsive, where you create one design to fit every single screen. While this has its limitations, the limitations have an advantage: Good design, all the time. It requires some abstract thinking around the design, however, with the proper testing, you can achieve a beatiful design that works on all surfaces, for all users.

### Deductive Design System
The DDS reduces the design down to its most fundemental elements, and removes everything but the most essential, so the users get exactly the information they need exactly when they need it. It's intuitive, minimal and takes a lot of inspiration both from Japanese minimalism and Scandinavian functionalism. If its available on desktop, it should be available on mobile, so we never remove any element. 

- Data only flows down
- 150px rule; the site should scale perfectly from 150px to 150 000px. 
- 100ms rule; Everything you do has to be completed in 100ms
