Launch frontend:
1. npm install
2. ng serve
use node version 14

# Angular Dependency Injection System

## Overview

Angular's Dependency Injection (DI) system is a design pattern that implements Inversion of Control (IoC), allowing for the efficient creation and management of service instances. The DI system injects dependencies such as services or objects into components, directives, or other services, promoting modularity, reusability, and testability.

## Usage and Benefits

### Modularity

Angular's DI system enhances modularity by decoupling the creation of dependencies from the classes that use them. This makes it easier to manage and maintain the application, as components remain independent and self-contained.

### Reusability

Services can be reused across different components or modules without the need to create multiple instances. This reduces redundancy and ensures consistent behavior throughout the application.

### Testability

DI allows for the injection of mock services into components during testing, simplifying the process of unit testing by enabling isolated testing of individual components or services.

### Flexibility

DI makes it easy to change the implementation of a dependency without modifying the classes that use it. This allows for greater flexibility in configuring and extending an application.

## Injection Options

### Constructor Injection

Constructor injection is the most common form of dependency injection in Angular. Dependencies are provided via the constructor of a class.

```typescript
@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor(private http: HttpClient) { }
}
constructor(@Optional() private myService: MyService) { }

###InjectionToken

InjectionToken is used to inject non-class dependencies, such as strings or objects, and is a way to create a custom injection token.

const API_URL = new InjectionToken<string>('apiUrl');

@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor(@Inject(API_URL) private apiUrl: string) { }
}

###Hierarchical Injectors

Angular supports hierarchical dependency injectors, allowing for different levels of providers (component-level, module-level, or application-level).

@Component({
  selector: 'app-example',
  providers: [MyService], // Component-level provider
})
export class ExampleComponent {
  constructor(private myService: MyService) { }
}

##Multi-Provider
Multi-provider allows multiple providers to be associated with a single injection token, which is useful for plugins or extending functionality.

const MULTI_PROVIDER_TOKEN = new InjectionToken<string[]>('multiProvider');

@NgModule({
  providers: [
    { provide: MULTI_PROVIDER_TOKEN, useValue: 'Provider1', multi: true },
    { provide: MULTI_PROVIDER_TOKEN, useValue: 'Provider2', multi: true }
  ]
})
export class AppModule { }

##providedIn
The providedIn metadata in @Injectable specifies where the service should be provided. Common options include 'root' for a singleton across the app or 'any' for a new instance in every lazy-loaded module.

@Injectable({
  providedIn: 'root', // or 'any'
})
export class MyService { }

======================================================

#Given a table called users with columns `id`, `name`, `email`, and `created_at`, write a query to find the top 10 users who have been recently created. Describe how you would optimize this query if the table grows to over 1M records.

## Query to Find the Top 10 Recently Created Users

To retrieve the top 10 users who have been recently created, you can use the following SQL query:

```sql
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;

##Optimization Strategies
1. Indexing

###Create an Index on created_at
Indexing the created_at column will improve the performance of the ORDER BY clause, allowing the database to efficiently sort and retrieve the most recent records.

CREATE INDEX idx_created_at ON users(created_at);

###Composite Index
If you frequently filter or sort by additional columns (e.g., created_at along with id), consider creating a composite index.

CREATE INDEX idx_created_at_id ON users(created_at, id);

###Covering Index
Ensure the index covers all columns in the SELECT clause (id, name, email, and created_at). This allows the database to retrieve the results directly from the index without accessing the full table.

CREATE INDEX idx_users_covering ON users(created_at, id, name, email);

2. Partitioning
###Range Partitioning
If the created_at column is used frequently for range queries (e.g., by month or year), consider partitioning the table by date ranges. This reduces the amount of data scanned for each query.

ALTER TABLE users
PARTITION BY RANGE (YEAR(created_at)) (
  PARTITION p2021 VALUES LESS THAN (2022),
  PARTITION p2022 VALUES LESS THAN (2023),
  PARTITION pmax VALUES LESS THAN MAXVALUE
);

3. Limit the Data Scope
Use Index-Only Scans
By carefully selecting columns and ensuring they are covered by indexes, you can minimize the amount of data that needs to be fetched.

Batch Processing
If you need to handle more extensive data sets, implement batch processing to process smaller chunks of data iteratively.

4. Query Caching
Cache Frequent Queries
If the query is run frequently, consider caching the results to reduce the load on the database. Use a caching layer like Redis or Memcached to store the results.

5. Optimize Database Configuration
Tune Database Parameters
Adjust database configuration parameters, such as buffer pool size or work memory, to ensure the database is optimized for large datasets.

Use a Faster Storage Engine
If you're using MySQL, consider using a storage engine like InnoDB, which is optimized for high-concurrency and large datasets.

6. Data Archiving
Archive Old Data
Move older records to an archive table if they are not frequently accessed. This reduces the size of the active users table and improves query performance.

===========================================================

#Explain the different categories of HTTP status codes and provide examples of
status codes that fall under each category.

# HTTP Status Codes

HTTP status codes are categorized into different classes to indicate the outcome of an HTTP request. Here’s an overview of the different categories and examples of status codes in each category.

## 1. Informational (100–199)

These status codes indicate that the request has been received and is being processed. They are typically used to provide information to the client.

- **100 Continue**: Indicates that the initial part of the request has been received and the client should continue with the request.
- **101 Switching Protocols**: Indicates that the server is switching protocols as requested by the client.

## 2. Successful (200–299)

These status codes indicate that the request was successfully received, understood, and accepted.

- **200 OK**: The request was successful, and the server has returned the requested data.
- **201 Created**: The request was successful, and a new resource has been created.
- **204 No Content**: The request was successful, but there is no content to send in the response.

## 3. Redirection (300–399)

These status codes indicate that further action is needed to fulfill the request, often involving a redirection to another resource.

- **301 Moved Permanently**: The requested resource has been permanently moved to a new URL.
- **302 Found**: The requested resource is temporarily located at a different URL.
- **304 Not Modified**: The resource has not been modified since the last request, so the client can use the cached version.

## 4. Client Error (400–499)

These status codes indicate that the client has made an error, and the server cannot process the request.

- **400 Bad Request**: The request could not be understood by the server due to malformed syntax.
- **401 Unauthorized**: Authentication is required and has failed or has not been provided.
- **403 Forbidden**: The server understands the request but refuses to authorize it.
- **404 Not Found**: The requested resource could not be found on the server.

## 5. Server Error (500–599)

These status codes indicate that the server has encountered an error or is otherwise incapable of performing the request.

- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.
- **501 Not Implemented**: The server does not support the functionality required to fulfill the request.
- **502 Bad Gateway**: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
- **503 Service Unavailable**: The server is currently unable to handle the request due to temporary overload or maintenance.

==============================================================================
#You have the following database tables:
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100),
created_at TIMESTAMP
);
---
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
product_name VARCHAR(100),
amount DECIMAL(10, 2),
order_date TIMESTAMP
);
Write a query resulting in the count of orders placed by each user in the past
month, with the total amount spent by each user - only for VIP users, meaning,
only for users with more than 5 orders.
Include the user’s name, email, order count, and total spent amount, and order
the results by the big spender in descending order


-- Step 1: Calculate the order count and total amount spent by each user in the past month
WITH RecentOrders AS (
    SELECT
        user_id,
        COUNT(*) AS order_count,
        SUM(amount) AS total_spent
    FROM
        orders
    WHERE
        order_date >= CURRENT_DATE - INTERVAL '1 month'
    GROUP BY
        user_id
)

-- Step 2: Select users who have placed more than 5 orders and join with user details
SELECT
    u.name,
    u.email,
    ro.order_count,
    ro.total_spent
FROM
    users u
JOIN
    RecentOrders ro
ON
    u.id = ro.user_id
WHERE
    ro.order_count > 5
ORDER BY
    ro.total_spent DESC;



