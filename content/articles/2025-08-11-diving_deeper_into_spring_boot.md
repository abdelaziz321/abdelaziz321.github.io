---
title: Diving Deeper Into Spring Boot (2)
description: After exploring the core Spring Framework, I turned my focus to Spring Boot. While studying, I dug into its auto-configuration, dependency management, configuration options, JPA integration, security, Actuator, and more. These are my notes from the journey.
---

After exploring the core Spring Framework, I turned my focus to Spring Boot. While studying, I dug into its auto-configuration, dependency management, configuration options, JPA integration, security, Actuator, and more. These are my notes from the journey. Happy reading 🙂

---

- **1. [Spring Boot Core Features](#spring-boot-core-features)**
- **2. [Starting a Spring Boot Project](#starting-a-spring-boot-project)**
    - 2.1. [Spring Initializr](#spring-initializr)
    - 2.2. [spring-boot-maven-plugin Usage](#spring-boot-maven-plugin-usage)
    - 2.3. [Basic Annotations](#basic-annotations)
    - 2.4. [Application Startup Hooks](#application-startup-hooks)
- **3. [Dependency Management](#dependency-management)**
    - 3.1. [Spring Boot Starters](#spring-boot-starters)
    - 3.2. [Spring Boot Parent POM Inheritance](#spring-boot-parent-pom-inheritance)
- **4. [Configuring Spring Boot](#configuring-spring-boot)**
    - 4.1. [Auto-Configuration](#auto-configuration)
    - 4.2. [Conditional Configuration](#conditional-configuration)
    - 4.3. [Customizing Spring Boot Behavior](#customizing-spring-boot-behavior)
        - 4.3.1. [Override Behavior via Properties](#override-behavior-via-properties)
        - 4.3.2. [Override Auto-Configured Beans](#override-auto-configured-beans)
        - 4.3.3. [Disabling Specific Auto-Configuration](#disabling-specific-auto-configuration)
        - 4.3.4. [Managing Dependencies and Versions in pom.xml](#managing-dependencies-and-versions-in-pomxml)
- **5. [Externalized Configuration](#externalized-configuration)**
    - 5.1. [Configuration Property Sources](#configuration-property-sources)
    - 5.2. [Locations of application.properties](#locations-of-applicationproperties)
    - 5.3. [Type-Safe Configuration (@ConfigurationProperties)](#type-safe-configuration-configurationproperties)
- **6. [Spring Boot and Spring Data JPA](#spring-boot-and-spring-data-jpa)**
    - 6.1. [Spring Data JPA Auto-Configuration](#spring-data-jpa-auto-configuration)
    - 6.2. [JPA Repository Interfaces](#jpa-repository-interfaces)
        - 6.2.1. [Derived Query Methods](#derived-query-methods)
        - 6.2.2. [@Query Annotation](#query-annotation)
    - 6.3. [Entity Configuration](#entity-configuration)
        - 6.3.1. [Entity Scanning](#entity-scanning)
        - 6.3.2. [Custom Column Mapping](#custom-column-mapping)
    - 6.4. [Criteria Queries](#criteria-queries)
    - 6.5. [Specifications](#specifications)
    - 6.6. [SQL and JPA-Based Database Initialization](#sql-and-jpa-based-database-initialization)
    - 6.7. [Flyway with Spring Boot](#flyway-with-spring-boot)
        - 6.7.1. [Migration Lifecycle](#migration-lifecycle)
        - 6.7.2. [Baseline Existing Databases](#baseline-existing-databases)
        - 6.7.3. [Best Practices](#best-practices)
        - 6.7.4. [Example](#flyway-example)
- **7. [Spring Boot and Web Applications](#spring-boot-and-web-applications)**
    - 7.1. [Spring MVC Auto-Configuration](#spring-mvc-auto-configuration)
    - 7.2. [HTTP Request Lifecycle in Spring MVC](#http-request-lifecycle-in-spring-mvc)
    - 7.3. [Content Negotiation & Message Conversion](#content-negotiation--message-conversion)
    - 7.4. [Developer Tools (spring-boot-devtools)](#developer-tools-spring-boot-devtools)
    - 7.5. [RESTful API Support](#restful-api-support)
        - 7.5.1. [Example](#restful-api-example)
    - 7.6. [HTTP Client (RestTemplate)](#http-client-resttemplate)
- **8. [Securing REST Application with Spring Security](#securing-rest-application-with-spring-security)**
    - 8.1. [Overview](#security-overview)
        - 8.1.1. [Java EE Security](#java-ee-security)
        - 8.1.2. [Spring Security](#spring-security)
    - 8.2. [Spring Security for HTTP-Based Applications](#spring-security-for-http-based-applications)
        - 8.2.1. [Basic Terms (Java EE Security Concepts)](#basic-terms-java-ee-security-concepts)
        - 8.2.2. [Spring Security Request Processing Flow](#spring-security-request-processing-flow)
        - 8.2.3. [Spring Security Filters](#spring-security-filters)
    - 8.3. [Authentication](#authentication)
        - 8.3.1. [Basic Terms](#authentication-basic-terms)
        - 8.3.2. [Flow Examples](#authentication-flow-examples)
    - 8.4. [Authorization](#authorization)
- **9. [Actuator](#actuator)**
    - 9.1. [Basic Terms](#actuator-basic-terms)
    - 9.2. [Using HTTP endpoints vs JMX](#using-http-endpoints-vs-jmx)
    - 9.3. [Observability Flow Example](#observability-flow-example)
    - 9.4. [Methods of Instrumenting Metrics](#methods-of-instrumenting-metrics)
    - 9.5. [Hierarchical vs. Dimensional Metrics](#hierarchical-vs-dimensional-metrics)
    - 9.6. [Instrumenting Metrics Examples](#instrumenting-metrics-examples)
        - 9.6.1. [Using Built-in annotations](#using-built-in-annotations)
        - 9.6.2. [Manually using meters](#manually-using-meters)
        - 9.6.3. [Custom AOP approach](#custom-aop-approach)
    - 9.7. [The HealthIndicator System](#the-healthindicator-system)
        - 9.7.1. [Custom Health Check Example](#custom-health-check-example)
        - 9.7.2. [Health Indicator Groups](#health-indicator-groups)
    - 9.8. [Securing Actuator](#securing-actuator)
    - 9.9. [Auditing](#auditing)
        - 9.9.1. [Basic Terms](#auditing-basic-terms)
        - 9.9.2. [Configuration](#auditing-configuration)
        - 9.9.3. [Querying Audit Logs](#querying-audit-logs)
        - 9.9.4. [Custom Events](#custom-events)
        - 9.9.5. [Persistence](#auditing-persistence)
- **10. [Logging in Spring Boot](#logging-in-spring-boot)**

---

## <a id="spring-boot-core-features"></a> 1. Spring Boot Core Features
- Spring Boot is **opinionated** as it provides:
	- Default configurations.
	- Pre-selected libraries to simplify development.
- Main Features:
	- Includes embedded servers (`Tomcat`, `Jetty`) by default.
	- Automatically exposes app metrics (memory, CPU, requests) via `Micrometer`.
	- Provides `/actuator/health` to monitor app status (e.g., database, disk space) in real-time.
	- Supports external configuration via properties files.
	- Uses starters to ensure compatible library versions.

---
## <a id="starting-a-spring-boot-project"></a> 2. Starting a Spring Boot Project

### <a id="spring-initializr"></a> 2.1. Spring Initializr:
- Simplifies the creation of Spring Boot projects by allowing selecting dependencies, build tools (Maven/Gradle), and configuration settings.
- Can be used through:
	- Browser: https://start.spring.io
	- IDEs: Most modern IDEs integrate with Spring Initializr..
	- Command line:
```bash
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa \
  -d javaVersion=17 \
  -d type=maven-project \
  -d bootVersion=3.4.4 \
  -d groupId=com.aziz \
  -d artifactId=hello \
  -output o.zip && unzip o.zip -d . && rm o.zip
```
### <a id="spring-boot-maven-plugin-usage"></a> 2.2. The usage of the `spring-boot-maven-plugin`:
- Helps building and running Spring Boot applications using Maven (e.g., via `mvn spring-boot:run`)..
- Generates the following JAR files in the `target/` directory:
	- **`my-app.jar`**: An executable (fat) JAR that includes all compiled classes and runtime dependencies.
	- **`my-app.jar.original`**: The original JAR produced by Maven before repackaging. It contains only your application's compiled classes.
### <a id="basic-annotations"></a> 2.3. Basic Annotations:
- `@SpringBootConfiguration`: A specialized version of `@Configuration` used specifically for Spring Boot configuration classes.
- `@EnableAutoConfiguration`: Automatically configures Spring application based on dependencies in the classpath.
```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.example.myapp") // Optional: scans for components in specified package
public class MyApplication {}

// ------- easier ------- //
@SpringBootApplication
public class MyApplication {}
```
### <a id="application-startup-hooks"></a> 2.4. Application Startup Hooks:
Run code after the application context is loaded.
- `CommandLineRunner`: Accepts raw `String... args` from the command line.

```java
// java -jar app.jar --import
@Component
public class MyCommandLineRunner implements CommandLineRunner {
	@Override
	public void run(String... args) {
		if (args.length > 0 && args[0].equals("--import")) {
			System.out.println("Importing data from CSV...");
		}
	}
}
```
- `ApplicationRunner`: Uses `ApplicationArguments` for easier access to options and values.

```java
// java -jar app.jar --import=data.csv
@Component
public class MyApplicationRunner implements ApplicationRunner {
	@Override
	public void run(ApplicationArguments args) {
		if (args.containsOption("import")) {
			String path = args.getOptionValues("import").get(0);
			System.out.println("Importing from: " + path);
		}
	}
}

```
- Both runners execute after the application starts, and can be ordered using the `@Order` annotation when multiple runners exist.

---
## <a id="dependency-management"></a> 3. Dependency Management
Spring Boot simplifies dependency management through several mechanisms.
### <a id="spring-boot-starters"></a> 3.1. Spring Boot Starters:
- Starter POMs that bundle commonly used dependencies together.
- Each starter includes all needed dependencies for a specific functionality.
- Examples:
	- `spring-boot-starter`: Core starter that includes auto-configuration support and logging.
	- `spring-boot-starter-web`: Starter for web applications (includes Spring MVC, Tomcat).
	- `spring-boot-starter-data-jpa`: Starter for working with JPA and Hibernate for database access.
	- `spring-boot-starter-security`: Starter for authentication and authorization.
	- `spring-boot-starter-test`: Starter for testing (JUnit, Mockito, Spring Test).
	- `spring-boot-starter-batch`: Starter for batch processing.
	- `spring-boot-starter-mail`: Starter for sending emails with JavaMailSender.
- Spring Boot auto-selects the `ApplicationContext` implementation based on the included starters.
### <a id="spring-boot-parent-pom-inheritance"></a> 3.2. Spring Boot Parent POM Inheritance:
`spring-boot-starter-parent`: Provides default Java version, default configurations, and contains a `dependencyManagement` section to manage and control versions of dependencies.
```xml
<!------------ SPRING BOOT PARENT POM ------------>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>5.6.7.Final</version>
        </dependency>
    </dependencies>
</dependencyManagement>

<!------------ PROJECT POM ------------>
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId> <!-- No version needed -->
    </dependency>
</dependencies>
```

---
## <a id="configuring-spring-boot"></a> 4. Configuring Spring Boot
### <a id="auto-configuration"></a> 4.1. Auto-Configuration:
- Spring Boot simplifies the setup of the application by automatically configuring necessary beans based on the libraries in the classpath.
- Example: if it finds `spring-boot-starter-data-jpa`, it configures a JPA entity manager.
- Auto Configuration classes can be found in the `spring-boot-autoconfigure` module.
### <a id="conditional-configuration"></a> 4.2. Conditional Configuration:
- Auto-Configuration classes use conditions to determine whether certain beans should be created.
- Examples:
	- `@ConditionalOnClass("com.example.Foo")`: Applies if the class is present on the classpath.
	- `@ConditionalOnMissingClass("com.example.Foo")`: If class missing.
    - `@ConditionalOnBean(MyService.class)`: Applies if the specified bean exists in the context.
    - `@ConditionalOnMissingBean(MyService.class)`: If bean absent.
    - `@ConditionalOnProperty(name = "feature.enabled", havingValue = "true")`: Applies if the property exists and matches the value.
    - `@ConditionalOnExpression("#{environment['feature.enabled'] == 'true'}")`: Applies if the SpEL expression evaluates to true.
	- `@ConditionalOnResource("classpath:/myfile.yml")`: Applies if the resource exists on the classpath.
    - `@ConditionalOnJava(JavaVersion.SEVENTEEN)`: Applies if running on the **specified Java version**.
```java
@Configuration
@ConditionalOnClass(DataSource.class) // Only applies if DataSource is on the classpath
@EnableConfigurationProperties(DataSourceProperties.class) // Binds DataSource properties
public class DataSourceAutoConfiguration {
    @Bean
    @ConditionalOnMissingBean // Only creates this bean if it does not exist
    public DataSource dataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }
}
```
- `@Profile` is a conditional annotation that allows to define beans that only be loaded in specific environments.
```java
@Profile("development")
@Bean
public DataSource dataSource() {}
```
### <a id="customizing-spring-boot-behavior"></a> 4.3. Customizing Spring Boot Behavior:
Spring Boot provides multiple ways to override its defaults.
#### <a id="override-behavior-via-properties"></a> 4.3.1. Override Behavior via Properties:
```yaml
logging.level.com.example: DEBUG
```
#### <a id="override-auto-configured-beans"></a> 4.3.2. Overrides Auto-Configured Beans:
- Spring Boot Auto Configure a default `SecurityFilterChain`:
```java
@AutoConfiguration
@ConditionalOnClass(SecurityFilterChain.class)
public class SecurityAutoConfiguration {
    @ConditionalOnMissingBean(SecurityFilterChain.class)
    @Bean
    SecurityFilterChain defaultSecurityFilterChain(/* ... */) { /* ... */ }
}

@Bean
SecurityFilterChain defaultSecurityFilterChain(/* ... */) { /* ... */ }
```
- And that can be overridden by defining a `SecurityFilterChain`:
```java
@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(/* ... */) { /* ... */ }
}
```
#### <a id="disabling-specific-auto-configuration"></a> 4.3.3. Disabling Specific Auto-Configuration:
```java
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class MyApplication {}
// OR
spring.autoconfigure.exclude: org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
```
#### <a id="managing-dependencies-and-versions-in-pomxml"></a> 4.3.4. Managing Dependencies and Versions in `pom.xml`:
```xml
<!-- override the Spring Boot version -->
<properties>
    <spring-boot.version>2.6.4</spring-boot.version>
</properties>

<!-- override the used Servlet container -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId> <!-- Exclude Tomcat -->
            </exclusion>
        </exclusions>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId> <!-- Replaces Tomcat -->
    </dependency>
</dependencies>
```

---
## <a id="externalized-configuration"></a> 5. Externalized Configuration
Externalized configuration allows separation of environment-specific settings from the application code.
### <a id="configuration-property-sources"></a> 5.1. Configuration Property Sources:
Spring Boot loads configuration properties in the following order (highest to lowest precedence):
- Command-line arguments (`--server.port=8081`).
- Environment variables.
- Java system properties (`-Dserver.port=8082`),
- Profile-specific files: `application-{profile}.properties` or `.yml`.
- Default properties file: `application.properties` or `.yml` in `src/main/resources`.
### <a id="locations-of-applicationproperties"></a> 5.2. Locations of `application.properties`:
Spring Boot checks for `application.properties` or `.yml` in the following locations _(Highest → Lowest)_ Priority:
1. `./config/application.properties`: (External `config` directory next to the JAR).
2. `./application.properties`: (External file in same directory as the JAR).
3. `classpath:/config/application.properties`: (`config` directory inside the JAR).
4. `classpath:/application.properties` (Root of classpath inside the JAR).
> Profile-specific variants (e.g., `application-prod.yml`) are checked at each level _after_ the base file.
### <a id="type-safe-configuration-configurationproperties"></a> 5.3. Type-Safe Configuration (`@ConfigurationProperties`):
- It binds related configuration properties to a bean in a type-safe way.
```java
/**
mail.host=10.10.10.10
mail.port=465
**/

@Data
@Component
@ConfigurationProperties(prefix = "mail")
public class MailConfig {
    private String host;
    private int port;
}
```

---
## <a id="spring-boot-and-spring-data-jpa"></a> 6. Spring Boot and Spring Data JPA
### <a id="spring-data-jpa-auto-configuration"></a> 6.1. Spring Data JPA Auto-Configuration:
When `spring-boot-starter-data-jpa` is on the classpath, Spring Boot automatically configures the following components:
- `DataSource` bean:
	- Database connection properties are read from `application.properties`.
	- If a supported database driver is on the classpath, it will be used.
	- If no properties are defined, an embedded database like H2 is used by default.
- `EntityManagerFactory`bean:
    - Provided by Hibernate by default, based on the configured `DataSource`.
    - All `@Entity` classes on the classpath are automatically scanned.
- `JpaTransactionManager`:
	- Manages transactions for the JPA persistence layer.
    - Supports declarative transaction management using `@Transactional`.
- `JPA Repositories`:
	- Can be Activated by extending `JpaRepository`.
### <a id="jpa-repository-interfaces"></a> 6.2. JPA Repository Interfaces:
- Auto-generated Implementations:
	- After creating a repository interface. Spring Data JPA automatically generates a proxy repository class at runtime.
- Available base repositories for extending:
	- `CrudRepository<T, ID>`: Basic CRUD operations.
	- `PagingAndSortingRepository<T, ID>`: Extends `CrudRepository` with methods for pagination and sorting.
	- `JpaRepository<T, ID>`: Extends `PagingAndSortingRepository` with JPA-specific operations like batch updates and `flush()`.
	- `Repository<T, ID>`: Marker interface for custom implementations.
	- `JpaSpecificationExecutor<T>`: Supports Criteria API queries.
	- `ElasticsearchRepository<T, ID>`: Adds search capabilities for Elasticsearch.
#### <a id="derived-query-methods"></a> 6.2.1. Derived Query Methods:
- Methods in repository interfaces follow naming conventions to auto-generate queries at runtime.
- They use Spring's proxy mechanism to handle those calls.
```java
/* 
 * [Action][Limit][Distinct]By[Property][Condition][LogicalOperator]...[OrderBy...]
 * 
 * Segments:
 * ─────────
 * [Action]           → find == read == get == query == search == stream // Required 
 * [Limit]            → First == Top | Top3 == First3                    // Optional
 * [Distinct]         → Distinct                                         // Optional
 * By                 → (literal)
 * [Property]         → Entity field names (can be nested)
 * [Condition]        → Is | Not | GreaterThan | LessThanEqual | Between | Like | Containing | ... 
 * [LogicalOperator]  → And | Or                                         // Optional chaining
 * [OrderBy...]       → OrderByFieldAsc | OrderByFieldDesc               // Optional sorting
 */
public interface UserRepository extends JpaRepository<User, Long> {

    // ────── [Action] ──────
    List<User> findByUsername(String username);
    List<User> readByEmail(String email);
    List<User> getByPhoneNumber(String phone);

    // ────── [Limit] ──────
    User findTopByOrderByCreatedAtDesc();                     // LIMIT 1 (latest)
    List<User> findTop3ByStatus(String status);               // Top 3
    List<User> findFirst5ByRole(String role);                 // First 5

    // ────── [Distinct] ──────
    List<User> findDistinctByLastName(String lastName);       // SELECT DISTINCT
    List<User> findTop5DistinctByAgeGreaterThan(int age);     // DISTINCT + LIMIT

    // ────── [Boolean Field] ──────
    List<User> findByIsActiveTrue();                          // isActive == true
    List<User> findByIsActiveFalse();                         // isActive == false
    List<User> findByEnabledIs(Boolean enabled);              // Boolean = ?
    List<User> findByEnabled(Boolean enabled);                // same as above

    // ────── [Null Checks] ──────
    List<User> findByEmailIsNull();
    List<User> findByEmailIsNotNull();

    // ────── [Equality / Is] ──────
    List<User> findByUsernameIs(String username);             // Same as findByUsername

    // ────── [Not Equal / Negation] ──────
    List<User> findByStatusNot(String status);                // status != ?

    // ────── [Comparison: Numbers / Dates] ──────
    List<User> findByAgeGreaterThan(int age);                 // age > ?
    List<User> findByAgeGreaterThanEqual(int age);            // age >= ?
    List<User> findByCreatedAtAfter(LocalDateTime time);      // created_at > ?
    List<User> findByCreatedAtBefore(LocalDateTime time);     // created_at < ?
    List<User> findByAgeBetween(int min, int max);            // age BETWEEN

    // ────── [Text / Pattern Matching] ──────
    List<User> findByEmailLike(String pattern);               // LIKE '%abc%'
    List<User> findByUsernameContaining(String part);         // LIKE '%part%'
    List<User> findByUsernameNotContaining(String part);      // NOT LIKE
    List<User> findByFirstNameStartingWith(String prefix);    // LIKE 'prefix%'
    List<User> findByLastNameEndingWith(String suffix);       // LIKE '%suffix'
    List<User> findByUsernameIgnoreCase(String username);     // Case-insensitive

    // ────── [IN / NOT IN] ──────
    List<User> findByRoleIn(List<String> roles);              // role IN (...)
    List<User> findByIdNotIn(List<Long> ids);                 // id NOT IN (...)

    // ────── [Logical Operators] ──────
    List<User> findByUsernameAndEmail(String u, String e);
    List<User> findByStatusOrRole(String status, String role);

    // ────── [Nested / Embedded Properties] ──────
    List<User> findByCompany_Name(String name);               // join on entity
    List<User> findByAddress_City(String city);               // embedded/nested

    // ────── [Collection Fields] ──────
    List<User> findByTagsContaining(String tag);              // collection contains

    // ────── [Ordering / Sorting] ──────
    List<User> findByCountryOrderByAgeAsc(String country);
    List<User> findByDepartmentOrderBySalaryDesc(String dept);
    List<User> findTop3ByStatusOrderByCreatedAtDesc(String status);
    User findFirstByOrderByUsernameAsc();                     // Top 1 alphabetically
}

```
- Additional actions: `count`, `delete == remove`, `exists`.
```java
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Count orders in date range
    long countByOrderDateBetween(LocalDate start, LocalDate end);
    
    // Delete unpaid expired orders
    long deleteByStatusAndPaymentDateIsNull(String status);
    
    // Check if high-value order exists
    boolean existsByTotalAmountGreaterThan(BigDecimal amount);
}
```
#### <a id="query-annotation"></a> 6.2.2. The `@Query` Annotation:
- Enables custom querying to native SQL queries or JPQL queries.
```java
// **Native SQL**
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Query(value = "SELECT * FROM users WHERE last_name = ?1", nativeQuery = true)
    List<User> findByLastNameNative(String lastName);

    @Query(value = "SELECT COUNT(*) FROM users", nativeQuery = true)
    Long countUsers();

    @Query(value = "SELECT * FROM users WHERE age BETWEEN ?1 AND ?2", nativeQuery = true)
    List<User> findUsersBetweenAges(int startAge, int endAge);
}

// **JPQL Queries**: offers a level of abstraction over native SQL.
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.lastName = :lastName")
    List<User> findByLastName(@Param("lastName") String lastName);

	  @Query("SELECT u FROM User u JOIN u.orders o WHERE u.lastName = :lastName")
    List<User> findUsersWithOrdersByLastName(@Param("lastName") String lastName);

	  @Query("SELECT u, SUM(o.amount) AS totalAmount " +
           "FROM User u JOIN u.orders o " +
           "GROUP BY u.id " +
           "HAVING totalAmount > 1000")
    List<Object[]> findUsersWithTotalOrderAmountAbove1000();
}
```

### <a id="entity-configuration"></a> 6.3. Entity Configuration:
#### <a id="entity-scanning"></a> 6.3.1. Entity Scanning: 
- Spring Boot scans the main application package and sub-packages by default. Use `@EntityScan` to override.
- Spring Boot scans for `@Entity` classes in the application’s base package by default.
- Use `@EntityScan(basePackages = "com.example.entities")` to specify the location.
#### <a id="custom-column-mapping"></a> 6.3.2. Custom Column Mapping:
```java
@Entity  // Marks this class as a JPA entity (will be mapped to a database table)
public class User {

    @Embedded  // An embeddable component (fields will be included directly in the User's table rather than a separate table)
    @AttributeOverrides({
        @AttributeOverride(name = "street", column = @Column(name = "user_street")),
        @AttributeOverride(name = "zipCode", column = @Column(name = "postal_code"))
    })
    private Address address;  // Embedded Address object with customized column mappings
}```
### <a id="criteria-queries"></a> 6.4. Criteria Queries:
- A `CriteriaBuilder` is used to build `CriteriaQuery` objects which is used to perform a query.
- The `Predicate` class is part of the Criteria API and is used to construct where clauses.
```java
public class UserCriteriaQuery {
    public List<User> findUsers(String name, Integer age) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);

        // DEFINE THE ROOT ENTITY (FROM CLAUSE)
        Root<User> userRoot = criteriaQuery.from(User.class);

        // INITIALIZE PREDICATE WITH CONJUNCTION (WHERE 1=1 EQUIVALENT). SERVES AS A BASE TO ADD MORE CONDITIONS
        Predicate predicate = criteriaBuilder.conjunction();

        // ADDING CONDITIONS
        predicate = criteriaBuilder.and(
            predicate,
            criteriaBuilder.equal(userRoot.get("name"), name)
        );
        predicate = criteriaBuilder.and(
            predicate,
            criteriaBuilder.greaterThan(userRoot.get("age"), age)
        );

        // APPLY THE CONSTRUCTED PREDICATE AS WHERE CLAUSE
        criteriaQuery.where(predicate);
        
        // ADDING MORE CLAUSES
        criteriaQuery.orderBy(criteriaBuilder.asc(userRoot.get("name"))); // ORDER BY
        criteriaQuery.groupBy(userRoot.get("email"));  // GROUP BY

        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
```
### <a id="specifications"></a> 6.5. Specifications:
Defines reusable `Predicate` components..
```java
class UserSpecification {
    public static Specification<User> hasName(String name) {
        return (root, query, criteriaBuilder) ->
            name == null ? null : criteriaBuilder.equal(root.get("name"), name);
    }

    public static Specification<User> hasEmail(String email) {
        return (root, query, criteriaBuilder) ->
            email == null ? null : criteriaBuilder.equal(root.get("email"), email);
    }
}

interface UserRepository extends CrudRepository<User, Long>, JpaSpecificationExecutor<User> {}

@Service
class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findUsers(String name, String email, Integer age) {
        return userRepository.findAll(
            Specification
              .where(UserSpecification.hasName(name))
              .and(UserSpecification.hasEmail(email))
        );
    }
}
```
### <a id="sql-and-jpa-based-database-initialization"></a> 6.6. SQL and JPA-Based Database Initialization
- Spring Boot supports two main approaches for initializing a database at application startup:
- **SQL Script Initialization**:
	- Automatically run `schema.sql` (for schema) and `data.sql` (for seed data) at startup.
	- Spring Boot will  load `schema-${platform}.sql` and `data-${platform}.sql` files if present, where `${platform}` is the value of `spring.datasource.platform` (e.g., `h2`, `mysql`, `postgresql`)
	- Custom locations can be specified:
```properties
spring.sql.init.schema-locations=classpath:/db/schema.sql
spring.sql.init.data-locations=classpath:/db/data.sql
```
- **JPA/Hibernate Schema Generation**:
	- When using Spring Data JPA, Hibernate can automatically create or validate the schema based on `@Entity` mappings.
		- `none`: No action.
		- `validate`: Validate schema matches entities.
		- `update`: Alter DB schema to match entities.
		- `create`: Drop and recreate schema.
		- `create-drop`: Same as `create` but drops schema on shutdown.
```properties
spring.jpa.hibernate.ddl-auto=create  # or update, validate, none, etc.
```
### <a id="flyway-with-spring-boot"></a> 6.7. Flyway with Spring Boot:
- Manage database schema changes in Spring applications.
- Flyway auto-configuration is enabled. as soon as the `flyway-core` dependency is on the classpath. It scans `db/migration` by default.
- Flyway migrations are applied during integration testing with `@SpringBootTest`.
#### <a id="migration-lifecycle"></a> 6.7.1. Migration Lifecycle:
1. On startup, Spring runs Flyway migrations before Hibernate initializes.
2. Flyway checks the `flyway_schema_history` table to decide which migrations to apply.
3. If the DB is empty, Flyway creates this table and runs all migrations.
4. If the DB has existing migrations, Flyway only applies new ones.
#### <a id="baseline-existing-databases"></a> 6.7.2. Baseline Existing Databases:
For databases that already exist before Flyway:
1. Flyway creates `flyway_schema_history` table. 
2. Treats current schema as "version 1".
3. Applies only new migrations `V2+`,
```properties
spring.flyway.baseline-on-migrate=true  # Creates baseline if no schema history exists
spring.flyway.baseline-version=1       # Starts migration tracking from version 1
```
#### <a id="best-practices"></a> 6.7.3. Best Practices:
- Never modify applied migrations. Always **roll forward** and create new files.
- Disable Hibernate `auto-DDL`.
```properties
spring.jpa.hibernate.ddl-auto=validate
```
- Generate the SQL that would be executed.
```bash
mvn flyway:migrate -Dflyway.dryRunOutput=/tmp/planned_migrations.sql
```
#### <a id="flyway-example"></a> 6.7.4. Example:
```sql
-- src/main/resources/db/migration/V1__Create_customers.sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
```

```bash
mvn flyway:migrate
#  Successfully applied 1 migration (execution time 00:00.123s)

mvn flyway:info
#  +-----------+---------+---------------------+------+---------------------+---------+
#  | Version   | State   | Description         | Type | Installed On        | Script  |
#  +-----------+---------+---------------------+------+---------------------+---------+
#  | 1         | Success | Create customers    | SQL  | 2024-03-20 10:00:00 | V1__... |
#  +-----------+---------+---------------------+------+---------------------+---------+
```

```sql
-- src/main/resources/db/migration/V2__Add_email_column.sql
ALTER TABLE customers ADD COLUMN email VARCHAR(255) UNIQUE;
```

```bash
mvn flyway:migrate
#  Successfully applied 1 migration (V2), now at version 2
```

---
## <a id="spring-boot-and-web-applications"></a> 7. Spring Boot and Web Applications
### <a id="spring-mvc-auto-configuration"></a> 7.1. Spring MVC Auto-Configuration:
When `spring-boot-starter-web` is on the classpath, Spring Boot automatically configures the following components:
- `Embedded Web Server`: Includes Tomcat, Jetty, or Undertow.
- `DispatcherServlet`: Central `servlet` that routes incoming HTTP requests to appropriate controller methods.
- `Jackson JSON support`: Automatically converts Java objects to/from JSON.
- `Static Resources`: Serves static content from `/static`, `/public`, `/resources`, or `/META-INF/resources`.
### <a id="http-request-lifecycle-in-spring-mvc"></a> 7.2. HTTP Request Lifecycle in a Spring MVC:
1. A client sends a request.
2. The `DispatcherServlet` intercepts and maps the request to a controller.
3. The controller processes the request and populates a Model.
4. The `DispatcherServlet` resolves the view and renders the response.
5. The response is sent back to the client.
**DispatcherServlet**:
- Acts as the front controller for handling incoming web requests.
- Maps incoming requests to specific controller methods based on URL patterns and HTTP methods using annotations like `@RequestMapping`.
### <a id="content-negotiation--message-conversion"></a> 7.3. Content Negotiation & Message Conversion:
Spring Boot auto-configures HTTP content negotiation to support multiple response formats such as JSON, XML, and plain text.
- The client sends a request with an `Accept` header (e.g., `Accept: application/json`, `application/xml`).
- The `DispatcherServlet` intercepts the request and maps it to the appropriate controller.
- Before executing the controller method, Spring evaluates the `Accept` header and selects a suitable `HttpMessageConverter`:
    - `MappingJackson2HttpMessageConverter`: handles `application/json`.
    - `Jaxb2RootElementHttpMessageConverter`: handles `application/xml`.
    - `StringHttpMessageConverter`: handles `text/plain`.
    - `MultipartHttpMessageConverter`: handles requests with `Content-Type: multipart/form-data` (typically used for file uploads).
### <a id="developer-tools-spring-boot-devtools"></a> 7.4. Developer Tools (`spring-boot-devtools`):
- Enhances the development productivity through:
	- Automatic restarts.
	- Disabling template and static content caching.
- Automatically disabled when the application is packaged as a fat JAR.
### <a id="restful-api-support"></a> 7.5. RESTful API Support:
- REST (Representational State Transfer) is an architectural style for designing web services.
- It uses HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) to interact with resources identified by `URI`s.
- `@RequestBody`: binds the HTTP request body to a Java object.
- `@RestController`: combines `@Controller` and `@ResponseBody`.
#### <a id="restful-api-example"></a> 7.5.1. Example:
```java
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = itemService.getItemById(id);
        return item != null ? ResponseEntity.ok(item) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item createdItem = itemService.saveItem(item);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdItem.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdItem);
    }
}
```
### <a id="http-client-resttemplate"></a> 7.6. HTTP Client (`RestTemplate`):
- A blocking, synchronous client for making HTTP requests to interact with remote APIs.
```java
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;

@Service
public class ItemService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String baseUrl = "https://jsonplaceholder.typicode.com/items";

    public void start() {
        // 1. GET: getForObject()
        Item item = this.restTemplate.getForObject(baseUrl + "/1", Item.class);

        // 2. GET: getForEntity()
        ResponseEntity<Item> getResponse = this.restTemplate.getForEntity(baseUrl + "/1", Item.class);
        Item result = getResponse.getBody();

        // 3. POST: postForObject()
        Item newItem = new Item(null, "Post Title", "Post Body", 1);
        Item createdItem = restTemplate.postForObject(baseUrl, newItem, Item.class);

        // 4. POST: postForEntity()
        ResponseEntity<Item> postResponse = this.restTemplate.postForEntity(baseUrl, newItem, Item.class);
        System.out.println("POST Status=" + postResponse.getStatusCode());
        Item result = getResponse.getBody();

        // 5. PUT: put()
        Item updatedItem = new Item(1, "Updated Title", "Updated Body", 1);
        this.restTemplate.put(baseUrl + "/1", updatedItem);

        // 6. PUT (alternative): exchange()
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Item> putEntity = new HttpEntity<>(updatedItem, headers);
        ResponseEntity<Item> putResponse = restTemplate.exchange(baseUrl + "/1", HttpMethod.PUT, putEntity, Item.class);
        Item updated = putResponse.getBody();

        // 7. DELETE: delete()
        this.restTemplate.delete(baseUrl + "/1");
    }
}
```
---
## <a id="securing-rest-application-with-spring-security"></a> 8. Securing REST Application with Spring Security
### <a id="security-overview"></a> 8.1. Overview:
- **Principal**: represents the current user or entity.
- **Authentication**: verifying a user’s identity.
- **Authorization**: checking if an authenticated user has permission to perform an action.
- **Secured Resource**: part of the app protected by authorization (e.g., endpoints, methods).
#### <a id="java-ee-security"></a> 8.1.1. Java EE Security:
- Suitable for traditional Java EE applications running in managed containers.
- Mostly static configuration. Define roles and constraints in `web.xml`.
#### <a id="spring-security"></a> 8.1.2. Spring Security:
- Ideal for modern Spring Boot applications.
- Better support for REST APIs, `OAuth2`, micro-services, and modern security standards.
- Works with:
	- **HTTP-based applications** – secured using `HttpSecurity` and filters (most common).
	- **CLI and batch job applications** – secured using method-level security. activated by `@EnableMethodSecurity`.
	- **WebSocket-based applications** – secured via WebSocket message interceptors.
### <a id="spring-security-for-http-based-applications"></a> 8.2. Spring Security for HTTP-Based Applications:
#### <a id="basic-terms-java-ee-security-concepts"></a> 8.2.1. Basic Terms (Java EE Security Concepts):
- `Servlet Filters`: intercept HTTP requests for tasks like authentication, authorization, or logging.
- `FilterChain`: a Java EE interface for managing the order and flow of filters.
#### <a id="spring-security-request-processing-flow"></a> 8.2.2. Spring Security Request Processing Flow:
1. Servlet Container receives a request.
2. `DelegatingFilterProxy` is invoked (a `Servlet Filter` registered in the `web.xml` or via Java Config with name=`springSecurityFilterChain`).
3. It looks up the Spring bean `springSecurityFilterChain` which is an instance of `FilterChainProxy`.
	- `Filter delegate = getFilterBean(context); // finds the bean named "springSecurityFilterChain"`
	- `delegate.doFilter(request, response, chain); // calls FilterChainProxy.doFilter()`
4. `FilterChainProxy` matches the request to a `SecurityFilterChain` and applies the relevant security filters.
	- It uses the first `SecurityFilterChain` that matches the request path.
	- Multiple `SecurityFilterChain` is needed when different paths need completely different security behavior.

![delegating-filter-proxy](/articles-data/2025-08-11-diving_deeper_into_spring_boot/delegating-filter-proxy.png)
<br /><small>Image source: <a href="https://docs.spring.io/spring-framework/reference/core/beans/basics.html">spring.io</a></small>

##### Example:
```java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // returns an instance which helps in building request matcher rules.
            .authorizeHttpRequests()
                // public resources
                .antMatchers("/resources/**", "/static/**").permitAll()
                // stored as a list of `RequestMatcher` → `AuthorizationManager` mappings.
                // it builds up into a filter called `AuthorizationFilter` or `FilterSecurityInterceptor`.
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/manager/**").hasAnyRole("MANAGER", "ADMIN")
                .antMatchers("/finance/**").hasAuthority("ROLE_FINANCE")
                .antMatchers("/report/**").hasPermission("READ_REPORT")
                // any request that hasn't already matched a rule will require a user to be logged
                .anyRequest().authenticated()

            // returns a HttpSecurity so we can chain other configurers
            .and()
                // sets up a filter for processing form submissions + /login + /logout + Where to go on login success/failure:
                .formLogin()
                .loginPage("/login")
                .permitAll()

            // returns a HttpSecurity so we can chain other configurers
            .and()
                .logout()
                .logoutUrl("/logout")
                .permitAll();

          return http.build();
    }
}
```
> `antMatchers()` uses **Ant-style path matching** (wildcards like `*`, `**`, etc.).
> `mvcMatchers()` uses **Spring MVC path matching** (path variables like `{id}`),
#### <a id="spring-security-filters"></a> 8.2.3. Spring Security Filters:
Spring Security filters are the building blocks of its security system, each handling a specific task
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // SecurityContextPersistenceFilter - Loads and saves SecurityContext
        http.csrf().disable().addFilterBefore(new SecurityContextPersistenceFilter(), UsernamePasswordAuthenticationFilter.class);

        // UsernamePasswordAuthenticationFilter - Handles login form submits
        http.formLogin().loginProcessingUrl("/login");

        // BasicAuthenticationFilter - Handles HTTP Basic Authentication
        http.httpBasic();

        // BearerTokenAuthenticationFilter - Parses and authenticates JWT tokens
        http.oauth2ResourceServer().jwt(); // For JWT-based authorization

        // LogoutFilter - Handles logout requests
        http.logout().logoutUrl("/logout");

        // SecurityContextHolderFilter - Sets SecurityContext into thread-local
        http.addFilterBefore(new SecurityContextHolderFilter(), BasicAuthenticationFilter.class);

        // AnonymousAuthenticationFilter - Assigns anonymous authentication if not authenticated
        http.addFilterBefore(new AnonymousAuthenticationFilter("anonymousKey"), BearerTokenAuthenticationFilter.class);

        // ExceptionTranslationFilter - Translates access denied/authentication exceptions
        http.addFilterAfter(new ExceptionTranslationFilter(), SecurityContextHolderFilter.class);

        // FilterSecurityInterceptor - Final decision on authorization (can user access this resource?)
        http.addFilterBefore(new FilterSecurityInterceptor(), ExceptionTranslationFilter.class);

        // Authorization example for paths
        http.authorizeRequests()
          .antMatchers("/admin/**").hasRole("ADMIN")
          .anyRequest().authenticated();
    }
}
```
### <a id="authentication"></a> 8.3. Authentication:
#### <a id="authentication-basic-terms"></a> 8.3.1. Basic Terms
- `Authentication Manager`: central component that processes authentication requests. uses Authentication Providers to verify credentials.
- `ProviderManager`: The default implementation of `AuthenticationManager`.
	- Delegates authentication to a list of `AuthenticationProvider`s (e.g., `DB`, `JWT`, `LDAP`).
	- Multiple `ProviderManager`s might be needed for totally Isolated Authentication Flows:
		- `/api/** → JWT (stateless)` and `/admin/** → Database + 2FA (stateful)`
- `Authentication Provider`: an implementation used by the `Authentication Manager` to validate user credentials.
	- e.g., `DaoAuthenticationProvider` for database authentication. `OAuth2LoginAuthenticationProvider`.
    ![authentication-providers](/articles-data/2025-08-11-diving_deeper_into_spring_boot/authentication-providers.png)
    - <small>Image source: <a href="https://docs.spring.io">spring.io</a></small>

- `Authorization Manager`: checks whether the authenticated user has the necessary authorities.
- `GrantedAuthority`: an interface that represents an authority granted to an `Authentication` object.
- `SecurityContext`: holds security information, such as the authenticated principal.
	- stored in `SecurityContextHolder` to make it globally accessible within the app.
      ![security-context-holder](/articles-data/2025-08-11-diving_deeper_into_spring_boot/security-context-holder.png)
    - <small>Image source: <a href="https://docs.spring.io">spring.io</a></small>
- `Authentication` Object: the central representation of the current user’s authentication state.
	- Before Authentication contains: `isAuthenticated = false` & `credentials`.
	- After Authentication contains: `isAuthenticated = true` & `principal=UserDetails` & `authorities`.
- `UserDetailsService`: A service interface for loading user data from a database or anoth er data source.
- `BCryptPasswordEncoder`: uses `bcrypt` algorithm.
- `DelegatingPasswordEncoder`: supports multiple encoders and allows for future upgrades easily.
#### <a id="authentication-flow-examples"></a> 8.3.2. Flow Examples
1. `curl -u user@mail.com:password123 http://localhost:8080/secure-endpoint`
2. Request Reaches `BasicAuthenticationFilter` which extracts the email and password from the `Authorization: Basic ...` header.
3. The filter creates a `UsernamePasswordAuthenticationToken` (`Authentication`) and pass it to the `ProviderManager` (`AuthenticationManager`).
4. The `ProviderManager` delegates to `DaoAuthenticationProvider` (`AuthenticationProvider`).
5. `DaoAuthenticationProvider` uses `UserDetailsService` to fetch the user by email from the database.
6. `Password Encoder` compares the provided password with the stored hashed password in the database.
7. If authentication is successful, an authenticated `Authentication` object is created and stored in `SecurityContextHolder`.
8. User is granted access to resources based on their roles/permissions.
### <a id="authorization"></a> 8.4. Authorization
- `@Secured`: role-based check.
- `@PreAuthorize`: validates conditions before method execution.
- `@PostAuthorize`: validates return values after method execution.
- `@PreFilter`: filters input collections before method execution.
- `@PostFilter`: filters output collections after method execution.
```java
@Service
public class OrderService {
    @Secured({"ROLE_ADMIN", "ROLE_MANAGER"})
    public void deleteOrder(Long orderId) { }

    @PreAuthorize("hasRole('USER') and #order.owner.username == authentication.name")
    public void placeOrder(Order order) {}

    @PostAuthorize("returnObject.owner.username == authentication.name")
    public Order getOrderById(Long id) { return orderRepository.findById(id).orElseThrow(); }
      
    @PreFilter("filterObject.owner == authentication.name")  
    public void saveDocuments(List<Document> docs) { ... }  

    @PostFilter("filterObject.isPublic or filterObject.owner == principal.username")  
    public List<Document> getAllDocuments() { ... }
}
```
- The **SpEL** (Spring Expression Language) is used to evaluate security conditions like:
	- `hasRole('ADMIN')`
	- `hasAuthority('order:read')`
	- `isAuthenticated()`
	- `!isAnonymous()`
	- `#order.owner == principal.username`
	- `authentication.name`
	- `#id == authentication.principal.id`

---
## <a id="actuator"></a> 9. Actuator
### <a id="actuator-basic-terms"></a> 9.1. Basic Terms:
- **`Actuator`**:  provides production-ready monitoring and management endpoints.
	- Integrates with `Micrometer` to auto-publish metrics to a `MeterRegistry`. The metrics can be accessed through:
		- `/actuator/prometheus` (text-based Prometheus format).
		- `/actuator/metrics?tag=KEY:VALUE` (for inspecting metrics manually).
	- Provides health status of the application and its components via a `HealthIndicator`system.
		- Default endpoint: `/actuator/health`.
	- Exposes runtime state and configuration for debugging and monitoring.
		- Examples
			- `/actuator/env`
			- `/actuator/beans`
			- `/actuator/scheduledtasks`
			- `/actuator/mappings` (the HTTP endpoints and their handler methods)
		- All endpoints are enabled by default except `/actuator/shutdown`. (enabled doesn't mean exposed).
- **`Micrometer`**: in-app metrics collection library (integrated with Spring Boot).
- **`MeterRegistry`**: the core interface in `Micrometer` that:
	- creates and manages meters.
	- stores metrics in memory.
	- might export metrics to monitoring systems.
- **`Prometheus`**: time-series database that scrapes metrics.
- **`Grafana`**: visualization tool for `Prometheus` metrics.
### <a id="using-http-endpoints-vs-jmx"></a> 9.2. Using `HTTP` endpoints vs `JMX`:
Actuator supports `JMX` and `HTTP`.
- `HTTP` is preferred for modern cloud apps due to better REST integration, security, and compatibility with monitoring tools like Prometheus.
- `JMX` (Java Management Extensions) remains useful for JVM-level debugging with tools like `JConsole`.
### <a id="observability-flow-example"></a> 9.3. Observability Flow Example:
1. Application records metrics using `Micrometer APIs` (e.g., `MeterRegistry.counter()`).
2. metrics are stored in-memory in the `MeterRegistry`.
3. `Actuator` exposes metrics via HTTP endpoints like: `/actuator/prometheus`
4. `Prometheus` scrapes `/actuator/prometheus` at configured intervals. the collected metrics are stored as time-series data.
5. `Grafana` queries `Prometheus` to visualize metrics with dashboards.
> Note: `Micrometer` + `Prometheus` + `Actuator` + `Grafana` setup is the popular flow but it's not the only one.
### <a id="methods-of-instrumenting-metrics"></a> 9.4. Methods of Instrumenting Metrics:
- **Manually**: using the meters `Counter`, `Timer`, `DistributionSummary` (track distribution of values), `Gauge` (tracks a changing number).
- **Annotations**:  record metrics on methods using `@Timed`, `@Counted`, `@Gauge`.
- **Actuator**: automatically exposes application-related metrics like:
	- MVC Related
		- `http.server.requests`:  Measures request count, duration, response status, method, and URI.
	    - `tomcat.sessions.active.current`: Current number of active HTTP sessions (for embedded Tomcat).
		- `tomcat.sessions.created`: Total number of sessions created.
		- `tomcat.sessions.expired`: Number of expired sessions.
		- `tomcat.threads.busy`: Number of currently busy request-processing threads.
		- `tomcat.global.request.max`: Maximum number of concurrent requests.
	- `system.uptime`
	- `system.cpu.usage`
	- `process.cpu.usage`
	- `process.uptime`
	- `process.files.open`
	- `jvm.memory.used`
	- `jvm.memory.max`
	- `jvm.threads.live`
	- `jvm.threads.daemon`
	- `jvm.classes.loaded`
	- `jvm.classes.unloaded`
### <a id="hierarchical-vs-dimensional-metrics"></a> 9.5. Hierarchical vs. Dimensional metrics
**Hierarchical metrics** encode dimensions into the metric name, creating nested paths.
- used with legacy systems (Graphite).
```
orders.count.us-east.premium
orders.latency.us-east.premium
```
**Dimensional metrics** decouple the metric name from its attributes using tags.
- used with `Microservices`, `K8s`, `Prometheus`.
```
orders_count{region="us-east", tier="premium"}
orders_latency{region="us-east", tier="premium"}
```
Micrometer (and modern observability tools) favor dimensional metrics as it enables dynamic filtering/aggregation like:
- Orders per second for premium tier: `rate(orders_count{tier="premium"}[1m])`.
- Average latency: `rate(orders_latency_sum{region="us-east"}[5m]) / rate(orders_latency_count{region="us-east"}[5m])`.
### <a id="instrumenting-metrics-examples"></a> 9.6. Instrumenting Metrics Examples:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```
#### <a id="using-built-in-annotations"></a> 9.6.1. Using Built-in annotations:
```java
@Service
public class OrderService {
    private final MeterRegistry registry;

    @Timed(value = "order.process.time", description = "Time taken to process order")
    @Counted(value = "order.count", description = "Total orders processed")
    public void processOrder(Order order) { }
}
```
##### `/actuator/metrics/order.process.time`
```json
{
  "name": "order.process.time",
  "description": "Time taken to process order",
  "measurements": [
    {"statistic": "COUNT", "value": 42},
    {"statistic": "TOTAL_TIME", "value": 5.2},
    {"statistic": "MAX", "value": 0.25}
  ]
}
```
##### `/actuator/prometheus`
```prometheus
# HELP order_process_time_seconds Time taken to process order
# TYPE order_process_time_seconds summary
order_process_time_seconds_count 42
order_process_time_seconds_sum 5.2
order_process_time_seconds_max 0.25
```
#### <a id="manually-using-meters"></a> 9.6.2. Manually using meters:
```java
@Service
@RequiredArgsConstructor
public class OrderService {
    private final MeterRegistry registry;

    public void refundOrder(Order order) {
        Counter.builder("order.refunds")
            .tag("reason", order.getRefundReason())
            .register(registry)
            .increment();
        // ... logic
    }
}
```
#### <a id="custom-aop-approach"></a> 9.6.3. Custom AOP approach:
```java
@Aspect
@Component
@RequiredArgsConstructor
public class ErrorCounterAspect {
    private final MeterRegistry registry;

    @Around("@annotation(MonitorExecution)")
    public Object count(ProceedingJoinPoint pjp) throws Throwable {
        registry.counter(
            "method.executions", // metric name
            "class", pjp.getTarget().getClass().getSimpleName(), // tag-key, tag-value
            "method", pjp.getSignature().getName()  // tag-key, tag-value
        )
        .increment();
        return pjp.proceed();
    }
}

@MonitorExecution
public void process() {}
```
### <a id="the-healthindicator-system"></a> 9.7. The `HealthIndicator` System:
- All beans implementing `HealthIndicator` are automatically registered and included in the `/actuator/health` endpoint.
- Actuator provide built-in indicators like `DataSourceHealthIndicator`, `DiskSpaceHealthIndicator`.
- The `/actuator/health` endpoint report  their status (UP/DOWN).
```json
{
	"status": "UP",
	"components": {
		"db": { "status": "UP" },
		"disk": { "status": "UP", "details": { "free": "500MB" } }
	}
}
```
#### <a id="custom-health-check-example"></a> 9.7.1. Custom Health Check Example:
```java
@Component
public class ApiHealth implements HealthIndicator {
    @Override
    public Health health() {
        return this.checkApi()
            ? Health.up().withDetail("message", "reachable").build()
            : Health.down().withDetail("error", "unreachable").build();
    }
}
```
#### <a id="health-indicator-groups"></a> 9.7.2. Health Indicator Groups:
Organize and customize health checks.
##### Built-in Groups:
- `liveness`: checks if the app is running. included checks: `ping`, `diskSpace`.
- `readiness`: checks if the app can handle traffic. included checks: `db`, `custom-indecators`.
##### Custom Groups:
Example: `GET /actuator/health/critical`.
```yaml
management:
  endpoint:
    health:
      group:
        critical:           # Custom group name
          include: db, api  # Only these indicators
          show-details: always
```
### <a id="securing-actuator"></a> 9.8. Securing Actuator
Example of the `ActuatorSecurityConfig`:
```java
@Configuration
public class ActuatorSecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/health", "/actuator/info").permitAll()  // Public access
                .requestMatchers("/actuator/**").hasRole("ADMIN")                   // Restrict others
                .anyRequest().authenticated()
            )
            .httpBasic();  // Use basic auth
        return http.build();
    }
}
```
Example of the `application.yaml`.
```yml
server:
  port: 8080  # Main application runs on port 8080

management:
  server:
    port: 8081  # Actuator endpoints will run on a separate port
    address: 127.0.0.1  # Actuator only accessible locally

  endpoints:
    enabled-by-default: true
    web:
      exposure:
        include: health, info, metrics  # Only expose selected safe endpoints over HTTP
        exclude: env, beans, threaddump # Explicitly exclude sensitive endpoints

  endpoint:
    health:
      show-details: when-authorized  # Show detailed health info only when the user is authenticated
      roles: ADMIN                   # Require this role to see details
    metrics:
      enabled: true  # Enable /metrics endpoint

spring:
  security:
    user:
      name: admin        # Username for basic auth
      password: secret   # Password (you can externalize this in env vars or vault for safety)
      roles: ADMIN       # Role used to restrict access to sensitive endpoints

```
### <a id="auditing"></a> 9.9. Auditing:
#### <a id="auditing-basic-terms"></a> 9.9.1. Basic Terms:
- `AuditEvent`: A timestamped record of an action (e.g., login, data change).
- `AuditEventRepository`: The interface for storing and retrieving audit events. By default, uses an in-memory implementation.
- `@CreatedBy`/`@LastModifiedBy`: JPA annotations for auto-tracking entity modifications (requires separate `@EnableJpaAuditing`).
#### <a id="auditing-configuration"></a> 9.9.2. Configuration:
```properties
management.endpoint.auditevents.enabled=true
management.endpoints.web.exposure.include=auditevents
```
#### <a id="querying-audit-logs"></a> 9.9.3. Querying Audit Logs:
- Endpoint: `GET /actuator/auditevents`
- Filters:  `?principal=user1&type=LOGIN&after=2024-01-01`
```json
{
  "events": [
    {
      "timestamp": "2024-03-20T10:00:00Z",
      "principal": "admin",
      "type": "DATA_MODIFIED",
      "data": { "entity": "Order", "action": "DELETE" }
    }
  ]
}
```
#### <a id="custom-events"></a> 9.9.4. Custom Events:
```java
@Service
public class OrderService {
    private final AuditEventRepository auditRepo;

    public void deleteOrder(String orderId) {
        auditRepo.add(new AuditEvent(
            "admin", 
            "ORDER_DELETED", 
            Map.of("orderId", orderId)
        ));
    }
}
```
#### <a id="auditing-persistence"></a> 9.9.5. Persistence:
- `AuditEventRepository` can be overridden to store events permanently (e.g., in a database):
```java
@Repository
public class JpaAuditRepository implements AuditEventRepository {
    @PersistenceContext
    private EntityManager em;

    @Override
    public void add(AuditEvent event) {
        em.persist(event);
    }
}
```
---
## <a id="logging-in-spring-boot"></a> 10. Logging in Spring Boot
- When `spring-boot-starter` is on the classpath, the following logging components are automatically configured:
	- `SLF4J`: Serves as the logging facade (API layer) for application code.
	- `Logback`: Default implementation (via `spring-boot-starter-logging`).
	- `jcl-over-slf4j`: redirects Spring's internal *Commons Logging `JCL`* calls to `SLF4J`.
	- `jul-to-slf4j`: redirects Java Util Logging (`java.util.logging` `JUL`) to `SLF4J` (for legacy libraries/`JDK` logs)
- `Log4j2`: High-performance alternative to `Logback`.
	- requires explicit configuration and `log4j-to-slf4j`: Redirects `Log4j2` API calls to `SLF4J` (if present).
- **Best Practices**:
	- Parameterized Messages:
```java
// Good - no string concatenation if DEBUG is disabled
log.debug("Processing transaction {} with amount {}", txId, amount);

// Bad - incurs string concatenation cost unconditionally
log.debug("Processing transaction " + txId + " with amount " + amount);
```
- `logback-spring.xml` Example:
```xml
<configuration>
    <!-- 1. Start with Spring Boot defaults -->
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

    <!-- 2. Configure rolling file logs -->
    <appender name="ROLLING_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_FILE:-logs/app.log}</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- Rotate daily or when >100MB, keep 30 days max (compressed) -->
            <fileNamePattern>${LOG_FILE:-logs/app}.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>5GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>${FILE_LOG_PATTERN}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 3. Environment-specific setup -->
    <springProfile name="prod">
        <root level="INFO">
            <appender-ref ref="ROLLING_FILE"/> <!-- Production: file only -->
        </root>
    </springProfile>
    
    <springProfile name="dev">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/> <!-- Development: console + file -->
            <appender-ref ref="ROLLING_FILE"/>
        </root>
    </springProfile>
</configuration>
```
