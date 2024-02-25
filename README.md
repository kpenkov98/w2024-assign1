# COMP 4513 (Winter 2024)

### Assignment #1: Node, SQL (via supabase)

**Please view `COMP4513 Assignment 1.pdf` for instructions**

Test Links:

1. https://w2024-assign1.onrender.com/api/seasons
2. https://w2024-assign1.onrender.com/api/circuits
3. https://w2024-assign1.onrender.com/api/circuits/ref
4. https://w2024-assign1.onrender.com/api/circuits/season/year
5. https://w2024-assign1.onrender.com/api/constructors
6. https://w2024-assign1.onrender.com/api/constructors/ref
7. https://w2024-assign1.onrender.com/api/drivers
8. https://w2024-assign1.onrender.com/api/drivers/ref
9. https://w2024-assign1.onrender.com/api/drivers/search/substring
10. https://w2024-assign1.onrender.com/api/drivers/race/raceId
11. https://w2024-assign1.onrender.com/api/races/raceId
12. https://w2024-assign1.onrender.com/api/races/season/year
13. https://w2024-assign1.onrender.com/api/races/season/year/round
14. https://w2024-assign1.onrender.com/api/races/circuits/ref
15. https://w2024-assign1.onrender.com/api/races/circuits/ref/season/start/end
16. https://w2024-assign1.onrender.com/api/results/raceId
17. https://w2024-assign1.onrender.com/api/results/driver/ref
18. https://w2024-assign1.onrender.com//api/results/driver/ref/seasons/start/end
19. https://w2024-assign1.onrender.com//api/qualifying/raceId
20. https://w2024-assign1.onrender.com//api/standings/raceId/drivers
21. https://w2024-assign1.onrender.com//api/standings/raceId/constructors

API Functionality
You must create the following APIs with the specified routes and functionality. The returned data must be JSON format.

/api/seasons
Returns the seasons supported by the API (that is, all the data in the seasons table).

/api/circuits
Returns all the circuits

/api/circuits/ref
Returns just the specified circuit (use the circuitRef field), e.g., /api/circuits/monaco

/api/circuits/season/year
Returns the circuits used in a given season (order by round in ascending order), e.g., /api/circuits/season/2020

/api/constructors
Returns all the constructors

/api/constructors/ref
Returns just the specified constructor (use the constructorRef field), e.g., /api/constructors/mclaren

/api/constructors/season/year
Returns the constructors within a given season, e.g., /api/constructors/season/2020

/api/drivers
Returns all the drivers

/api/drivers/ref
Returns just the specified driver (use the driverRef field), e.g., /api/drivers/hamilton

/api/drivers/search/substring
Returns the drivers whose surname (case insensitive) begins with the provided substring, e.g., /api/drivers/search/sch

/api/drivers/season/year
Returns the drivers within a given season, e.g., /api/drivers/season/2022

/api/drivers/race/raceId
Returns the drivers within a given race, e.g., /api/drivers/race/1106

/api/races/raceId
Returns just the specified race. Don’t provide the foreign key for the circuit; instead provide the circuit name, location, and country.

/api/races/season/year
Returns the races within a given season ordered by round, e.g., /api/races/season/2020

/api/races/season/year/round
Returns a specific race within a given season specified by the round number, e.g., to return the 4th race in the 2022 season: /api/races/season/2022/4

/api/races/circuits/ref
Returns all the races for a given circuit (use the circuitRef field), ordered by year, e.g. /api/races/circuits/monza

/api/races/circuits/ref/season/start/end
Returns all the races for a given circuit between two years (include the races in the provided years), e.g.,
/api/races/circuits/monza/season/2015/2020
/api/races/circuits/monza/season/2020/2020

/api/results/raceId
Returns the results for the specified race, e.g., /api/results/1106
Don’t provide the foreign keys for the race, driver, and constructor; instead provide the following fields: driver (driverRef, code, forename, surname), race (name, round, year, date), constructor (name, constructorRef, nationality).
Sort by the field grid in ascending order (1st place first, 2nd place second, etc).

/api/results/driver/ref
Returns all the results for a given driver, e.g., /api/results/driver/max_verstappen

/api/results/driver/ref/seasons/start/end
Returns all the results for a given driver between two years, e.g., /api/results/drivers/sainz/seasons/2022/2022

/api/qualifying/raceId
Returns the qualifying results for the specified race, e.g., /api/qualifying/1106
Provide the same fields as with results for the foreign keys.
Sort by the field position in ascending order.

/api/standings/raceId/drivers
Returns the current season driver standings table for the specified race, sorted by position in ascending order. Provide the same fields as with results for the driver.

/api/standings/raceId/constructors
Returns the current season constructors standings table for the specified race, sorted by position in ascending order. Provide the same fields as with results for the constructor.
