<img src="https://ka.lt/media/intro.svg" alt="" width="100%" height="auto">

<img alt="Mozilla HTTP Observatory Grade" src="https://ka.lt/media/shield-licence.svg"> <img alt="Website" src="https://img.shields.io/website?style=flat-square&down_message=offline&up_message=online&url=https%3A%2F%2Fka.lt"> <img alt="Uptime Robot ratio (30 days)" src="https://img.shields.io/uptimerobot/ratio/m794185416-8ffeb1920e5dc9f7c754d4d3?style=flat-square"> <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/justchrister/kalt?style=flat-square"> <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/justchrister/kalt?style=flat-square">

<h1>Kalt — Make money, make a difference</h1>

Kalt is a startup building a vertically integrated fossil-free energy generator and exchange that lets anyone invest directly in fossil free energy generation, and earn direct dividends from it. 

## Back-end
<img src="https://ka.lt/media/architecture.svg" alt="" width="100%" height="auto">

The back-end leverages Supabase (postgres) as a message queue to enable seamless communication between the micro-services. This message queue system implements a publish-subscribe pattern where any service can publish messages to specific topics, and other services can subscribe to these topics to consume the messages. The quality of the message contents are ensured through interfaces and types, that are implemented in Postgres and the Nuxt. 

- Decoupling of services, allowing for independent scaling and easy maintenance.
- Improved fault tolerance, as services can continue to function even if some other services fail.
- Enhanced extensibility, as new services can be easily added to the system without affecting existing services.

Nuxt Microservices (APIs hosted on Vercel)
The project consists of multiple Nuxt microservices hosted on Vercel, each responsible for a specific functionality. These microservices expose APIs to interact with the front-end and other services. The microservices have their own state databases, which are hosted on Supabase.

- Modular design, making it easy to understand, develop, and maintain individual services.
- Flexibility to develop and deploy each service independently, reducing the risk of introducing bugs or causing downtime.
- Better resource utilization, as each service can be scaled independently based on its own requirements.

## Front-end
<img src="https://ka.lt/media/grids.svg" alt="" width="100%" height="auto">

Using the Nuxt framework lets us get the best of both reactive web applications and server-side rendered ones, the navigation is blazing fast, will still having reactive elements. 

The site leverages clamp(MIN, VAL, MAX) in order to be auto-responsive, where you create one design to fit every single screen. While this has its limitations, the limitations have an advantage: Good design, all the time. It requires some abstract thinking around the design, however, with the proper testing, you can achieve a beatiful design that works on all surfaces, for all users.

### Design system
- Data only flows down
- 150px rule; the website should scale perfectly from 150px to 150 000px. 
- 100ms rule; Everything you do has to be completed in 100ms
