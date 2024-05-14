<img src="https://ka.lt/images/github/intro.svg" alt="" width="100%" height="auto">

<img alt="Licence: MIT" src="https://ka.lt/images/github/shield-licence.svg"> <img alt="" src="https://img.shields.io/website?style=flat-square&down_message=offline&up_message=online&url=https%3A%2F%2Fka.lt"> <img alt="" src="https://img.shields.io/uptimerobot/ratio/m794185416-8ffeb1920e5dc9f7c754d4d3?style=flat-square"> <img alt="" src="https://img.shields.io/github/last-commit/justchrister/kalt?style=flat-square"> <img alt="" src="https://img.shields.io/github/commit-activity/m/justchrister/kalt?style=flat-square">

# Kalt — Make money, make a difference

Kalt is a startup building the tools for a new era of capitalism, where the goal is beyond financial growth. By allowing anyone to build a purpose-driven portfolio and earn direct dividends from it. 

<a href="https://ka.lt/vision" target="_blank"> Read our vision ↗</a>

## Backend
<img src="https://ka.lt/images/github/architecture.svg" alt="" width="100%" height="auto">

### Ledger
The backend leverages Supabase (postgres) as an append-only ledger and message queue to enable seamless communication between the microservices. All data is appended to tables where entities are immutable, and most data is read from these _ledgers_/topics directly from super simple functions. Such as `get().user()`.

#### Append-Only Ledger

Our backend uses a series of append-only tables, where entities are immutable. All data is appended to these tables, which we refer to as _ledgers_ or _topics_. Most data is read directly from these ledgers using simple functions, such as `get().user()`. This approach ensures a historical record of all changes, which is useful for auditing and data analysis.

#### Message Queue

For services or integrations that require state—which are rare cases—our system implements a publish-subscribe pattern. Other services can subscribe to these _ledgers_/topics to consume the messages. The quality of the message contents is ensured through interfaces and types, which are implemented in both Postgres and Nuxt.

#### Principles
- Decoupling of services, allowing for independent scaling and easy maintenance.
- Improved fault tolerance, as services can continue to function even if some other services fail.
- Enhanced extensibility, as new services can be easily added to the system without affecting existing services.

### Composables 
#### `get()` composable
To read data from our append-only ledgers, we use a series of get composables. These are simple functions that fetch data directly from the ledgers. For example, get().user() retrieves user data from the corresponding ledger. These composables provide an easy-to-use interface for data retrieval, abstracting away the underlying database operations. This makes our application more maintainable and our code cleaner and easier to understand.

#### `messaging()` composable
The composables/messaging.ts file manages the publish-subscribe messaging system in our application, facilitating decoupled communication between different parts or microservices. It exports functions for publishing messages to topics and subscribing to consume messages, providing an easy-to-use interface that abstracts away the underlying details of message transmission. This file may also handle error scenarios in the messaging system, such as failed message deliveries or subscriptions, enhancing the robustness of our application.

### Stack

1. Vercel & Heroku as hosting
2. Supabase for auth, postgres, and raw storage

## Frontend
<img src="https://ka.lt/images/github/grids.svg" alt="" width="100%" height="auto">

Using the Nuxt framework lets us get the best of both reactive web applications and server-side rendered ones, the navigation is blazing fast, will still having reactive elements. 

The site leverages `clamp(MIN, VAL, MAX)` for the sizing of all the elements and components, through a sizer() function. This allows us to be auto-responsive for all screens. While this has its limitations, the limitations have an advantage: _Good design, all the time_. It requires abstract thinking around the design and being extremely deliberate about what to include and omit. However, with proper testing, you can achieve a beatiful design that works on all surfaces, for all users, everywhere.

### Deductive Design System
The DDS reduces the design down to its most fundemental elements, and removes everything but the most essential, so the users get exactly the information they need exactly when they need it. It's intuitive, minimal and takes a lot of inspiration both from Japanese minimalism and Scandinavian functionalism. If its available on desktop, it should be available on mobile, so we never remove any element. 

#### The devil is in the details
The simplicity of the design can be seen in the implementation across the platform, through simple `SCSS` functions like `primary()` and `sizer()` you set colors and sizes across the entire design. No more huge CSS files with immense amounts of utility classes.

```
// Size and scale
$sitewidth: 86vw;
$maxsitewidth: 720px;
$columns: 45;
$unit: calc($sitewidth/$columns);
$unit-max: calc($maxsitewidth/$columns);

@function sizer($multiplier){
  @return clamp(1px, $unit*$multiplier, $unit-max*$multiplier);
}

@mixin site-width {
  width: $sitewidth;
  max-width: $maxsitewidth;
}

// Colors
$light: #FEFDFA;
$primary: #586BA4;

@function primary($mix){
  @return mix($primary, $light, $mix);
}
```

#### Principles
- Data only flows down
- 150px rule; the site should scale perfectly from 150px to 150 000px. 
- 100ms rule; Everything you do has to be completed in 100ms
