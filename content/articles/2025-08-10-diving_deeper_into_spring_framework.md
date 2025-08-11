---
title: Diving Deeper Into Spring Framework (1)
description: Just earned my Spring Certified Professional Developer certificate from VMware (Broadcom). While studying, I went deep into many Spring Framework concepts and put together these notes. My main sources were the Spring Academy learning path, the Spring documentation, and a few great chats with DeepSeek & ChatGPT.
---

Just earned my Spring Certified Professional Developer certificate from VMware (Broadcom). While studying, I went deep into many Spring Framework concepts and put together these notes. My main sources were the Spring Academy learning path, the Spring documentation, and a few great chats with DeepSeek & ChatGPT. Happy reading 🙂

---

- **0. [Overview](#overview)**
    - 0.1. [Java EE](#j2ee)
    - 0.2. [Spring Framework](#spring)
- **1. [The IoC Container](#ioc-container)**
    - 1.1. [Inversion of Control (IoC) Principle](#inversion-of-control-principle)
        - 1.1.1. [Service Locator Pattern](#service-locator-pattern)
        - 1.1.2. [Dependency Injection](#dependency-injection)
    - 1.2. [IoC Container Implementation](#ioc-container-implementation)
    - 1.3. [Spring Bean Lifecycle](#spring-bean-lifecycle)
        - 1.3.1. [Lifecycle Steps](#lifecycle-steps)
        - 1.3.2. [The BeanPostProcessor implementations](#beanpostprocessor-implementations)
        - 1.3.3. [Bean Scopes](#bean-scopes)
- **2. [Java-Based Configuration](#java-based-configuration)**
    - 2.1. [Core Annotations](#core-annotations)
    - 2.2. [Dependency Injection Conflict Resolution](#dependency-injection-conflict-resolution)
    - 2.3. [Registering Beans: Explicit vs. Stereotype-Based](#registering-beans-explicit-vs-stereotype-based)
        - 2.3.1. [Explicit Registration](#explicit-registration)
        - 2.3.2. [Stereotype Annotations-Based Registration](#stereotype-annotations-based-registration)
    - 2.4. [Injecting the Dependencies](#injecting-the-dependencies)
    - 2.5. [Optional Dependency Injection](#optional-dependency-injection)
- **3. [Properties & Profiles](#properties--profiles)**
    - 3.1. [Properties (Externalized Configuration)](#properties-externalized-configuration)
        - 3.1.1. [Priority Order](#priority-order)
        - 3.1.2. [Accessing Properties](#accessing-properties)
        - 3.1.3. [Spring Expressions Language SpEL](#spring-expressions-language-spel)
    - 3.2. [Profiles: Environment-Specific Configs](#profiles-environment-specific-configs)
- **4. [Validation, Data Binding, and Type Conversion](#validation-data-binding-and-type-conversion)**
    - 4.1. [Data Binding](#data-binding)
    - 4.2. [Type Conversion](#type-conversion)
    - 4.3. [Validation](#validation)
- **5. [Resources](#resources)**
    - 5.1. [Built-in Resource Implementations](#built-in-resource-implementations)
    - 5.2. [Example](#example)
- **6. [Aspect Oriented Programming](#aspect-oriented-programming)**
    - 6.1. [Key Concepts of AOP](#key-concepts-of-aop)
    - 6.2. [Example](#aop-example)
    - 6.3. [Proxies in Spring](#proxies-in-spring)
        - 6.3.1. [AOP Proxies](#aop-proxies)
        - 6.3.2. [Forcing the use of CGLIB proxying](#forcing-the-use-of-cglib-proxying)
    - 6.4. [Pointcut Examples](#pointcut-examples)
- **7. [JDBC Simplification with JdbcTemplate](#jdbc-simplification-with-jdbctemplate)**
    - 7.1. [Spring Template Classes](#spring-template-classes)
    - 7.2. [Using JdbcTemplate](#using-jdbctemplate)
    - 7.3. [Other Options](#other-options)
- **8. [Transaction Management with Spring](#transaction-management-with-spring)**
    - 8.1. [Transaction](#transaction)
    - 8.2. [ACID](#acid)
    - 8.3. [PlatformTransactionManager Implementations](#platformtransactionmanager-implementations)
    - 8.4. [Using Spring Transaction Management](#using-spring-transaction-management)
    - 8.5. [Rollback](#rollback)
    - 8.6. [Local vs. Global (Distributed) Transaction Management](#local-vs-global-distributed-transaction-management)
        - 8.6.1. [Local Transaction Management](#local-transaction-management)
        - 8.6.2. [Global (Distributed) Transaction Management](#global-distributed-transaction-management)
    - 8.7. [Transaction Isolation Levels](#transaction-isolation-levels)
    - 8.8. [Transaction Propagation](#transaction-propagation)

---

## <a id="overview"></a> 0. Overview
### <a id="j2ee"></a> 0.1. J2EE:
- Known as Java EE - Enterprise Edition. Introduced in 1999.
- An early framework for building enterprise-level applications in Java.
- Has been renamed to Jakarta EE.
- Key Features: Servlets and JSP (JavaServer Pages).

### <a id="spring"></a> 0.2. Spring:
- Released in 2004 to simplify the complexities of Java Enterprise Edition (J2EE).
- Key Features:
    - Dependency Injection and AOP.
    - Annotations and Java-based configuration, reducing the reliance on XML.

---

## <a id="ioc-container"></a> 1. The IoC Container
### <a id="inversion-of-control-principle"></a> 1.1. Inversion of Control Principle:
- A design principle in which the container takes control of the management of objects, instead of the class itself.

#### <a id="service-locator-pattern"></a> 1.1.1. Service Locator Pattern:
- A design pattern implementing the **IoC principle** where a central registry is responsible for providing access to dependencies.
- Client code asks the Service Locator for the required dependency.

```java
public class ServiceLocator {
    private static Map<String, Object> services = new HashMap<>();
    public static Object getService(String serviceName) { return services.get(serviceName); }
    public static void registerService(String serviceName, Object service) { services.put(serviceName, service); }
}
```

#### <a id="dependency-injection"></a> 1.1.2. Dependency Injection:
- A design pattern implementing the **IoC principle** which allows objects to receive their dependencies from an external source rather than creating them themselves.
- Easier maintenance, better unit testing practices.

```java
public EmailSender() { this.emailService = new GmailService(); }
// vs
public EmailSender(EmailService emailService) { this.emailService = emailService; }
```

### <a id="ioc-container-implementation"></a> 1.2. IoC Container Implementation:
- **BeanFactory**: The basic IoC container that provides basic features (instantiation and dependency injection).
- **ApplicationContext**: An interface built on top of BeanFactory provides more features like (event publishing, messaging, i18n).

```java
@Configuration
@Import({DataSourceConfig.class, ServiceConfig.class})
public class AppConfig {
    @Bean
    public UserService userService() { return new UserServiceImpl(); }
}

public class App {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        UserService userService = context.getBean(UserService.class);
    }
}
```

#### 1.2.1. Configuring the Spring Container:
- **XML-Based Configuration**: for legacy applications `ClassPathXmlApplicationContext`.
- **Java-Based Configuration**: for modern applications `AnnotationConfigApplicationContext`.
- **Web Application Contexts**: `XmlWebApplicationContext` & `AnnotationConfigWebApplicationContext`

![spring-container](/articles-data/2025-08-10-diving_deeper_into_spring_framework/spring-container.png)
<br /><small>Image source: <a href="https://docs.spring.io/spring-framework/reference/core/beans/basics.html">spring.io</a></small>

### <a id="spring-bean-lifecycle"></a> 1.3. Spring Bean Lifecycle:
#### <a id="lifecycle-steps"></a> 1.3.1. Lifecycle Steps:
1. Spring detects bean definitions from:
    - XML: (`<bean>` tags).
    - Annotations: (`@Component`, `@Bean`).
    - Programmatic registration: (via `BeanDefinitionRegistry`).
2. Spring converts each bean configuration into a `BeanDefinition` object, stored in `DefaultListableBeanFactory` (a registry).
    - `BeanDefinition`: contains (name, class, scope, properties, constructor-arguments, ...).
3. Spring allows modification of `BeanDefinition`s through the `BeanFactoryPostProcessor` implementations.
    - Example usage: altering bean definitions based on environment.

```java
@Component
public class BeanFactoryPostProcessorImpl implements BeanFactoryPostProcessor {
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory factory) {
        BeanDefinition beanDefinition = factory.getBeanDefinition("dataSource");
        beanDefinition.setScope(BeanDefinition.SCOPE_PROTOTYPE);  // changing the scope for some reason
        beanDefinition.getPropertyValues().add("url", env.getProperty("env.datasource.url"));
    }
}
```

4. Spring creates the bean instances and injects its dependencies based on its `BeanDefinition`s.
5. Spring checks the beans that implement the aware callback interfaces and injects the relevant object. Examples:
    - `BeanFactoryAware`: to get access to the `BeanFactory` that created the bean.
        - Example usage: dynamically retrieve different instances of a bean based on certain conditions at runtime.
        - `paymentService = (PaymentService) beanFactory.getBean("creditCardPaymentService");`.
    - `ApplicationContextAware`: to get access to the `ApplicationContext`.
        - Example usage: publishing application-wide events.
        - `applicationContext.publishEvent(new UserCreatedEvent(this, username));`.
    - `EnvironmentAware`: when a bean needs to be aware of the Spring `Environment` and the application's configuration properties.
    - `BeanNameAware`: when a bean needs to be aware of its own name.
        - Example usage: custom logging based on bean name.

```java
public class CustomLogger implements BeanNameAware {
    private String name;
    @Override
    public void setBeanName(String name) { this.name = name; }
    public void log(String message) { System.out.println("[" + name + "] - " + message); }
}

@Configuration
public class AppConfig {
    @Bean(name = "firstLogger")
    public CustomLogger firstLogger() { return new CustomLogger(); }
    @Bean(name = "secondLogger")
    public CustomLogger secondLogger() { return new CustomLogger(); }
}

CustomLogger firstLogger = (CustomLogger) context.getBean("firstLogger");   // firstLogger.log("")
CustomLogger secondLogger = (CustomLogger) context.getBean("secondLogger"); // secondLogger.log("")
```

6. Spring calls the `postProcessBeforeInitialization()` method of `BeanPostProcessor` implementations.

```java
@Component
public class EarlyValidationProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        // bean is created, dependencies injected but @PostConstruct hasn't run yet
        // validateSensitiveFields (ex: database weak username/password).
        return bean;
    }
}
```

7. Spring calls the initialization methods in this order:
    - Methods annotated with `@PostConstruct` (used most of the time).
    - `afterPropertiesSet()` method if the bean implements `InitializingBean` (mostly legacy).
    - Custom `init-method` specified in configuration (third-party class can't be modified).

```java
@Component
public class DatabaseService implements InitializingBean {
    @PostConstruct
    public void postConstruct() { System.out.println("1"); }

    @Override
    public void afterPropertiesSet() { System.out.println("2"); }

    public void customInit() { System.out.println("3"); }
}

@Configuration
public class AppConfig {
    @Bean(initMethod = "customInit")
    public DatabaseService databaseService() { return new DatabaseService(); }
}
```

8. Spring calls the `postProcessAfterInitialization()` method of `BeanPostProcessor` implementations.
    - Example usage: creating proxies (AOP), caching setup.

```java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        if (bean instanceof PaymentService) {
            // Could wrap bean in a proxy here
        }
        return bean;
    }
}
```

9. The fully initialized bean is now available in the IoC container for dependency injection and usage.
10. When the `ApplicationContext` is closed or the bean is being destroyed, Spring calls the destruction methods in this order:
    - Methods annotated with `@PreDestroy`.
    - `destroy()` method if the bean implements `DisposableBean`.
    - Custom `destroy-method` specified in configuration.

#### <a id="beanpostprocessor-implementations"></a> 1.3.2. The `BeanPostProcessor` implementations:
Spring uses `BeanPostProcessor` in conjunction with annotations to make the core IoC container aware of specific annotations:
1. Spring provides special `BeanPostProcessor` implementations that scan for specific annotations.
2. When annotations are found, these processors often create proxies around the beans.
3. The proxies inject the annotation's specified behavior.

Examples:
- `AutowiredAnnotationBeanPostProcessor` scans beans for `@Autowired` annotations.
- `InitDestroyAnnotationBeanPostProcessor` scans beans for `@PostConstruct`/`@PreDestroy`.

#### <a id="bean-scopes"></a> 1.3.3. Bean Scopes:

```java
@Bean
@Scope("singleton")
public UserService userService() { return new UserServiceImpl(); }
```

- **Singleton**: one instance of the bean is created for the entire Spring container.
- **Prototype**: creates a new instance of the bean every time it is requested from the container. Suitable for beans that hold transient state.
- **Thread**: within a single thread, the same bean instance is returned.
    - Example usage: a logging bean in multi-threaded environments that should only log information specific to the thread it's running in.
- **Request**: within a single HTTP request, the same bean instance is returned.
- **Session**: within a single HTTP session, the same bean instance is returned.
- **WebSocket**: within a single WebSocket session, the same bean instance is returned.
- **Application**: One bean instance per `ServletContext` (i.e., per web application in a server).

---

## <a id="java-based-configuration"></a> 2. Java-Based Configuration
### <a id="core-annotations"></a> 2.1. Core Annotations:
- `@Configuration`: Indicates that a class declares one or more `@Bean` methods.  
    - Can't be `final`: Spring creates `CGLIB` proxies for `@Configuration` classes to manage `@Bean` method calls. Final classes can't be proxied.  
    - Can't be `private`: Private classes can't be instantiated or proxied by Spring.
- `@Bean`: applied to methods in a `@Configuration`-annotated class. The return value should be registered as a bean in the IoC container.
- `@Lazy`: the bean will not be created until it is first requested.

#### <a id="example"></a> 2.1.1. Example:

```java
@Configuration
@Import({DataSourceConfig.class, ServiceConfig.class}) // import other `@Configuration` classes
public class AppConfig {
    @Bean
    public UserService userService() { return new UserServiceImpl(); }
}

public class App {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        UserService userService = context.getBean(UserService.class);
    }
}
```

### <a id="dependency-injection-conflict-resolution"></a> 2.2. Dependency Injection Conflict Resolution:
- `@DependsOn`: ensures that specified beans are created before the current bean.
- `@Qualifier`: explicit bean selection.
- `@Primary`: default bean preference.
- `@Fallback`: the bean will not be created until it is first requested.

#### <a id="example"></a> 2.2.1. Example:

```java
@Configuration
public class AppConfig {
    @Bean(name = "file") // named explicitly. otherwise name will be "fileLogger" (method name)
    public Logger fileLogger()    { return new Logger("FileLogger"); }

    @Bean
    @Primary // default choice if no @Qualifier is used
    public Logger consoleLogger() { return new Logger("ConsoleLogger"); }
}

@Service
public class LogService {
    @Autowired    // Injects consoleLogger because it's marked @Primary
    private Logger defaultLogger;

    @Autowired    // Injects fileLogger by name
    @Qualifier("file")
    private Logger fileLogger;
}
```

```java
@Configuration
public class AppConfig {
    @Bean
    public Logger fileLogger()    { return new Logger("FileLogger"); }

    @Bean
    @Fallback
    public Logger dbLogger()      { return new Logger("DBLogger"); }
}

@Service
public class LogService {
    @Autowired    // @Fallback is here to avoid NoUniqueBeanDefinitionException
    private Logger fileLogger;
}
```

### <a id="registering-beans-explicit-vs-stereotype-based"></a> 2.3. Registering Beans: Explicit vs. Stereotype-Based:
#### <a id="explicit-registration"></a> 2.3.1. Explicit Registration:
- Manually defines beans either programmatically using Java (`@Bean`) or declaratively via XML.
- Use Case: defining a custom `DataSource` for a multi-environment application.

```java
@Configuration
public class DataSourceConfig {
    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        HikariConfig config = new HikariConfig();
        // ... configure and return HikariDataSource
        return new HikariDataSource(config);
    }
}
```

#### <a id="stereotype-annotations-based-registration"></a> 2.3.2. Stereotype Annotations-Based Registration:
- Automatically registers stereotype-annotated beans via classpath scanning `@ComponentScan`.
- Stereotype Annotations:
    - `@Component`: to annotate any spring-managed component.
    - `@Service`: a service layer component (business logic).
    - `@Repository`: a Data Access Object that encapsulates storage, retrieval, and search behavior.
    - `@Controller`: a web controller that handles HTTP requests.
    - `@RestController`: A specialized version of `@Controller`. Combines `@Controller` and `@ResponseBody`.

```java
@Configuration
@ComponentScan(basePackages = "com.example.app") // scans for stereotypes
public class AppConfig {}

@Service  // implicit registration via scanning
public class UserService {}
```

### <a id="injecting-the-dependencies"></a> 2.4. Injecting the Dependencies:
- **`@Autowired` (2003):** Spring-native type-driven DI annotation. Created before Java DI standards existed (the recommended choice).
- **`@Resource` (`JSR-250`, 2006):** Java EE name-first DI annotation (`javax.annotation`). Part of Java EE 5's simplification effort.
- **`@Inject` (`JSR-330`, 2009):** Java-standard type-driven DI annotation (`javax.inject`).

#### 2.4.1. Strategies:
- **Constructor Injection**: considered as the best practice.
    - Easy to pass mock dependencies in unit tests.
    - Explicitly declares mandatory dependencies.
- **Method Injection**: dependencies are injected via a setter method.
    - Useful when dependencies are not mandatory.
- **Field Injection**: harder unit testing. Cannot easily provide mock implementations of dependencies.
    - `@Autowired` on a beans collection: Instantiate a collection filled with all the beans of the type.
    - `@Autowired` on final fields: Can't inject dependencies.

### <a id="optional-dependency-injection"></a> 2.5. Optional Dependency Injection:
- Beans will only be injected if present in the application context to prevent startup failures due to missing beans.
    - `@Autowired(required = false)`: Field is injected if bean exists, otherwise set to `null`.
    - `@Nullable`: Marks a constructor/method parameter as optional (uses `null` if absent).
    - `Optional<T>`: Wraps the bean in an `Optional`, which is `empty` if not available.

```java
@Component
public class NotificationService {

    // Field injection - null if PushSender not present
    @Autowired(required = false)
    private PushSender pushSender;

    // Constructor injection - mailSender is null if not present
    private final MailSender mailSender;

    @Autowired
    public NotificationService(@Nullable MailSender mailSender) {
        this.mailSender = mailSender;
    }

    // Optional injection - Optional.empty() if SmsSender not present
    @Autowired
    private Optional<SmsSender> smsSender;

    public void sendAll(String message) {
        if (pushSender != null) pushSender.send(message);
        if (mailSender != null) mailSender.send(message);
        smsSender.ifPresent(s -> s.send(message));
    }
}
```

---

## <a id="properties--profiles"></a> 3. Properties & Profiles
### <a id="properties-externalized-configuration"></a> 3.1. Properties (Externalized Configuration):
#### <a id="priority-order"></a> 3.1.1. Priority Order
Spring supports storing configuration outside the code, loaded in this order of priority:
1. Command-line arguments (`--server.port=8081`). **Overrides everything else**.
2. OS environment variables.
3. Property files loaded via `@PropertySource`.

#### <a id="accessing-properties"></a> 3.1.2. Accessing Properties:
- `@Value`: simple, one-off values `@Value("${db.url}") private String dbUrl;`.
    - `PropertySourcesPlaceholderConfigurer`: resolve `${…}` placeholders.
- `Environment`: Programmatic access.
- `@PropertySource("classpath:app.properties")`: Load custom `.properties` files.

```java
@Configuration
@PropertySource("classpath:custom.properties") // load custom.properties file
public class AppConfig {

    @Value("${app.name}")
    private String appName;

    private final Environment env;
    private final DatabaseConfig dbConfig;

    public AppConfig(Environment env, DatabaseConfig dbConfig) {
        this.env = env;
        this.dbConfig = dbConfig;
    }

    public void showAllPropertyAccessMethods() {
        System.out.println(appName);   // @Value
        System.out.println(env.getProperty("app.database.url")); // Environment
    }
}
```

#### <a id="spring-expressions-language-spel"></a> 3.1.3. Spring Expressions Language `SpEL`:
- A powerful expression language integrated into Spring for querying and manipulating objects at runtime.
- Complex SpEL can affect the performance.
- User-provided input can lead to code injection.

- Common Usage:
    - `@Value` Annotations: `@Value("#{systemEnvironment['ENV'] == 'prod' ? 'prod.db' : 'dev.db'}")`
    - Spring Security: `@PreAuthorize("hasRole('ADMIN') and #{user.id == authentication.principal.id}")`

```java
@Component
public class SpELDemo {

    // Literals & Arithmetic
    @Value("#{42}")                               // Integer literal
    private int literalInt;

    @Value("#{3.14 * 2}")                         // Arithmetic expression
    private double multiplied;

    // Boolean & Logical
    @Value("#{5 > 3 && 10 < 20}")                 // true
    private boolean logicalAnd;

    @Value("#{!(false)}")                         // true
    private boolean logicalNot;

    // String Operations
    @Value("#{'  Hello  '.trim().toUpperCase()}") // "HELLO"
    private String processedString;

    @Value("#{'Spring'.length()}")                // 6
    private int stringLength;

    // Ternary + Elvis + Safe Navigation
    @Value("#{5 > 3 ? 'yes' : 'no'}")             // Ternary: "yes"
    private String ternary;

    @Value("#{someBean?.optionalField}")          // Safe navigation
    private String safeNavigation;

    @Value("#{someBean.optionalField ?: 'default'}") // Elvis fallback
    private String elvis;

    // Method & Static Access
    @Value("#{T(java.lang.Math).pow(2, 3)}")      // 8.0
    private double power;

    @Value("#{T(java.time.LocalDate).now().getYear()}") // Current year
    private int currentYear;

    @Value("#{T(java.lang.Math).PI}")             // 3.1415...
    private double pi;

    // Type Conversion & Comparison
    @Value("#{new java.math.BigDecimal('10.5').compareTo(new java.math.BigDecimal('10.0')) > 0}") // true
    private boolean bigDecimalCompare;

    // Bean Reference
    @Value("#{someBean.message}")                 // Accessing another bean's field
    private String fromAnotherBean;

    // Collections: Selection & Projection
    @Value("#{{1, 2, 3, 4}.?[#this > 2]}")       // [3, 4]
    private List<Integer> filteredList;

    @Value("#{{'a','b','c'}.![#this.toUpperCase()]}") // ["A", "B", "C"]
    private List<String> upperList;

    // Inline List & Map
    @Value("#{{'dev','test','prod'}}")           // Inline List
    private List<String> profiles;

    @Value("#{{'key1':'val1','key2':'val2'}}")   // Inline Map
    private Map<String, String> keyValueMap;
}
```

### <a id="profiles-environment-specific-configs"></a> 3.2. Profiles: Environment-Specific Configs
- Profiles allow you to define environment-specific beans and configurations (e.g., `dev`, `test`, `prod`).
- `@Profile`: Beans are registered only when the specified profile is active.
- To activate profiles: `java -Dspring.profiles.active=dev,debug,aws -jar app.jar`.

```java
public interface PaymentService {
    String processPayment();
}

@Service
@Profile("dev")
public class MockPaymentService implements PaymentService {
    @Override
    public String processPayment() { return "[DEV] Simulated payment of $10"; }
}

@Service
@Profile("prod")
public class StripePaymentService implements PaymentService {
    @Override
    public String processPayment() { return "[PROD] Processed $10 via Stripe"; }
}

@RestController
public class CheckoutController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/pay")
    public String pay() {
        return paymentService.processPayment();
    }
}
```

---

## <a id="validation-data-binding-and-type-conversion"></a> 4. Validation, Data Binding, and Type Conversion
Spring Boot/MVC use these features behind the scenes — e.g., `@RequestParam`, `@PathVariable` auto-bind and convert request data.

### <a id="data-binding"></a> 4.1. Data Binding:
Automatically binds HTTP request parameters (e.g., form inputs, query strings) to Java objects.

```java
@Controller
public class UserController {
    @PostMapping("/user")
    public String submit(@ModelAttribute User user) { /* binds params to User object automatically */ }
}
```

### <a id="type-conversion"></a> 4.2. Type Conversion:
Converts values between types (e.g., `String` → `Integer`, `String` → `LocalDate`).

```java
public class User {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
}
```

### <a id="validation"></a> 4.3. Validation:
Checks constraints (`@NotBlank`, `@Email`) and populates `BindingResult`.

```java
public class User {
    @Email
    @NotBlank
    private String email;
}

@Controller
public class UserController {
    @PostMapping("/user")
    public String submit(@Valid User user, BindingResult result) {
        if (result.hasErrors()) { return "error-page"; }
        // Proceed if valid
    }
}
```

---

## <a id="resources"></a> 5. Resources:
### <a id="built-in-resource-implementations"></a> 5.1. Built-in Resource Implementations:
- `ClassPathResource`: Loads resources from the classpath (e.g., `src/main/resources`).
- `FileSystemResource`: Accesses files from the local file system.
- `UrlResource`: Wraps `java.net.URL`; supports protocols like HTTP, FTP, etc.
- `ServletContextResource`: Accesses web application resources (e.g., `WEB-INF/`).
- `ByteArrayResource`: Reads from an in-memory byte array.

### <a id="example"></a> 5.2. Example:

```java
Resource resource = new ClassPathResource("data.txt");
String content = Files.readString(resource.getFile().toPath());
```

---

## <a id="aspect-oriented-programming"></a> 6. Aspect Oriented Programming
- AOP aims to separate cross-cutting concerns from the main business logic of an application.
- It adds additional behavior - like logging or security - to the existing code without modifying the code itself.
- `@EnableAspectJAutoProxy`: enables support for handling `@Aspect`-annotated components.
    - In Spring Boot, it's often implicitly enabled via `@SpringBootApplication`.

### <a id="key-concepts-of-aop"></a> 6.1. Key Concepts of AOP:
![aop-terms](/articles-data/2025-08-10-diving_deeper_into_spring_framework/aop-terms.png)
- `Aspect`: A module encapsulates a cross-cutting concern.
- `Advice`: Action taken by an aspect when a particular join point is reached.
    - **Advice Types**: 
        - Non-Wrapping Advice (`JoinPoint`): `@Before`, `@After`, `@AfterReturning`, `@AfterThrowing`.
            - _Common operations_: `jp.getArgs()`, `jp.getSignature()`, `jp.getTarget()`.
        - Wrapping Advice (`ProceedingJoinPoint`): `Around`.
            - _Common operations_: `pjp.proceed()`.
- `Pointcut`: A predicate that matches join points.
- `Target Object`: An object being advised by one or more aspects.
- `Join Point`: A point during the execution of a program. e.g. method call.
- `Weaving`: Integrating aspects into the application code.
    - Java AOP frameworks perform weaving at runtime.

### <a id="aop-example"></a> 6.2. Example:

```java
@EnableAspectJAutoProxy
class AppConfig {}

@Aspect // A module that encapsulates a cross-cutting concern (logging in this case)
@Component
public class LoggingAspect {
    @Pointcut("execution(* com.example.service.UserService.*(..))") // A predicate that matches join points
    public void userServiceMethods() {}

    @AfterReturning("userServiceMethods()") // Action taken after a method in UserService returns successfully
    public void logAfterReturning(JoinPoint joinPoint) {
        System.out.println("After returning from method: " + joinPoint.getSignature().getName());
    }

    @Around("userServiceMethods()") // Action taken around a method in UserService
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - start;
        System.out.println(joinPoint.getSignature().getName() + " executed in " + executionTime + "ms");
        return proceed;
    }
}

@Service
public class UserService {    // The Target Object being advised
    public void createUser(String username) { /* ... */ }  // a join point.
    public void deleteUser(String username) { /* ... */ }  // a join point.
}
```

### <a id="proxies-in-spring"></a> 6.3. Proxies in Spring:
1. When Spring finds a bean that needs proxying (for AOP, transactions, etc.), it creates a proxy object.
2. When you call a method on the proxy, it can add extra actions (like starting a transaction or logging).
3. After the extra actions, the proxy calls the real method on the target object.
4. The target object runs the method, then control goes back to the proxy.
5. The proxy can perform additional actions (such as committing or rolling back a transaction) before returning the result.

#### <a id="aop-proxies"></a> 6.3.1. AOP Proxies
Spring AOP chooses between `JDK dynamic proxies` and `CGLIB` proxies based on the target object's characteristics:
- `JDK dynamic proxy` (Interface-based Proxies) is used if the target object implements an interface.
    - Used as the Default in Spring. `CGLIB` is used only when necessary.
- `CGLIB proxy` (Class-based Proxies) is created if the target object does not implement any interfaces.
    - Spring Boot configures Spring AOP to use `CGLIB` proxies by default.

#### <a id="forcing-the-use-of-cglib-proxying"></a> 6.3.2. Forcing the use of `CGLIB` proxying: 
1. Need to intercept all methods, including non-interface methods.
2. Want to apply aspects on classes that do not implement interfaces.

```java
@EnableCaching(proxyTargetClass = true)
@EnableAspectJAutoProxy(proxyTargetClass = true)
@EnableTransactionManagement(proxyTargetClass = true)

// application.properties
// spring.aop.proxy-target-class=true
```

### <a id="pointcut-examples"></a> 6.4. Pointcut Examples

```java
@Component
@Aspect
public class LoggingAspect {

    // execution([modifier] return-type declaring-type-pattern method-name-pattern(param-pattern) throws-pattern?)
    // Match specific method signature
    @Before("execution(void com.example.service.UserService.createUser(String))")

    // Match any method named 'save'
    @Before("execution(* save(..))")

    // Match public methods returning anything with any args
    @Before("execution(public * *(..))")

    // Match all methods in a specific package (no subpackages)
    @Before("execution(* com.example.service.*.*(..))")

    // Match all methods in a package and its sub-packages
    @Before("execution(* com.example..*.*(..))")

    // Match all methods in classes ending with 'Service'
    @Before("execution(* com.example..*Service.*(..))")

    // Match methods annotated with @Transactional
    @Before("@annotation(org.springframework.transaction.annotation.Transactional)")

    // Match all methods inside repository package (including subpackages)
    @Before("within(com.example.repository..*)")

    // Match methods in classes annotated with @RestController
    @Before("@within(org.springframework.web.bind.annotation.RestController)")

    // Match methods with *parameters* annotated with custom @Audit annotation
    @Before("@args(com.example.annotations.Audit)")

    // Match methods with a single String argument
    @Before("args(String)")

    // Match methods where first arg is String, followed by anything
    @Before("args(String, ..)")

    // Match methods with any two arguments
    @Before("args(*, *)")

    // Match beans whose names start with 'repo'
    @Before("bean(repo*)")

    // Match method annotated with @Transactional AND with String arg
    @Before("@annotation(org.springframework.transaction.annotation.Transactional) && args(String)")
}
```

---

## <a id="jdbc-simplification-with-jdbctemplate"></a> 7. JDBC Simplification with JdbcTemplate
### <a id="spring-template-classes"></a> 7.1. Spring Template Classes:
- Spring Template Classes are based on the **Template Method Design Pattern**.
- **Template Method Design Pattern**: a high-level process is defined in a base class, and certain steps are left open for customization.
- Common Template Classes: `JdbcTemplate`, `KafkaTemplate`, and `RestTemplate`.

### <a id="using-jdbctemplate"></a> 7.2. Using `JdbcTemplate`:
- The process of interacting with the database is predefined by Spring through the template.
- Specific parts of the process can be customized.
- `JdbcTemplate` throws an unchecked `DataAccessException` instead of a checked `SQLException` (must be wrapped in try-catch).
- `JdbcTemplate` obtains connections dynamically at runtime from the configured `DataSource`.

```java
public class JdbcTemplateExample {

    private JdbcTemplate jdbcTemplate;

    public void start() {

        // ================================
        // 0. DDL Operation (Create Table)
        // ================================
        // DDL = Data Definition Language
        // Use execute() for DDL commands
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, name VARCHAR(255))");

        // ================================
        // 1. DML Operation (Insert - Single Row)
        // ================================
        // DML = Data Manipulation Language
        // INSERT, UPDATE, DELETE
        jdbcTemplate.update("INSERT INTO users(id, name) VALUES (?, ?)", 1, "Aziz");

        // ----------------------------------------
        // Callback Interfaces: PreparedStatementSetter – Functional
        jdbcTemplate.update("INSERT INTO users(name) VALUES (?)", (PreparedStatement ps) -> ps.setString(1, "Ali"));

        // ================================
        // 2. Batch Update (Multiple Rows)
        // ================================
        // BatchPreparedStatementSetter – Not functional (2 methods)
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        jdbcTemplate.batchUpdate("INSERT INTO users(name) VALUES (?)",
            new BatchPreparedStatementSetter() {
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    ps.setString(1, names.get(i));
                }
                public int getBatchSize() {
                    return names.size();
                }
            }
        );

        // ================================
        // 3. Query for a Single Object
        // ================================
        // Callback Interfaces: RowMapper<T> – Functional
        User user = jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?",
            (rs, rowNum) -> new User(rs.getInt("id"), rs.getString("name")),
            1
        );

        // ================================
        // 4. Query for a Map (Single Row as Map<String, Object>)
        // ================================
        Map<String, Object> userMap = jdbcTemplate.queryForMap(
            "SELECT * FROM users WHERE id = ?", 1
        );

        // ================================
        // 5. Query for a List (Multiple Rows, Each as Map)
        // ================================
        List<Map<String, Object>> userList = jdbcTemplate.queryForList(
            "SELECT * FROM users"
        );

        // ================================
        // 6. Query with Custom RowMapper (Multiple Rows → List<T>)
        // ================================
        List<User> users = jdbcTemplate.query(
            "SELECT * FROM users",
            (rs, rowNum) -> new User(rs.getInt("id"), rs.getString("name"))
        );

        // ================================
        // 7. Query with Callback Interfaces: ResultSetExtractor (Full control)
        // ================================
        List<User> extracted = jdbcTemplate.query("SELECT * FROM users",
            (ResultSet rs) -> {
                List<User> result = new ArrayList<>();
                while (rs.next()) {
                    result.add(new User(rs.getInt("id"), rs.getString("name")));
                }
                return result;
            }
        );
        
        // ================================
        // 8. Process each row without returning. Callback Interfaces: RowCallbackHandler
        // ================================
        jdbcTemplate.query("SELECT * FROM users", rs -> {
            System.out.println("User (lambda): " + 
                rs.getInt("id") + " - " + rs.getString("name"));
        });
    }
}
```

### <a id="other-options"></a> 7.3. Other Options:
1. **JPA** (Java Persistence API): provides specification for object-relational mapping (`ORM`).
2. **Hibernate**: A popular implementation of JPA with additional features. Others: EclipseLink, OpenJPA.
3. **Spring Data JPA**: Reduces boilerplate with repository abstraction. Uses Hibernate implementation by default.

---

## <a id="transaction-management-with-spring"></a> 8. Transaction Management with Spring
### <a id="transaction"></a> 8.1. Transaction:
- A sequence of operations treated as a single unit.
- Ensures **consistency** and **integrity** when accessing shared resources (like a database).
    - If Account A was debited but Account B was not credited, the system would be **inconsistent**.
    - Insert a new order with a `CustomerID` that doesn’t exist in the `customers` table, the system would have **integrity** issues.
- Enables concurrent access by making sure all operations succeed or fail together.

### <a id="acid"></a> 8.2. ACID:
- **Atomicity**: Either all operations are executed, or none are.
- **Consistency**: Data remains valid after a transaction.
- **Isolation**: Prevents interference between concurrent transactions.
- **Durability**: Changes are permanent once committed.

### <a id="platformtransactionmanager-implementations"></a> 8.3. `PlatformTransactionManager` Implementations:
This interface provides a unified way to manage transactions across different types of transactional resources:
1. `DataSourceTransactionManager`: Manages transactions for a single JDBC `DataSource`.
2. `JpaTransactionManager`: for JPA-based persistence (e.g., Hibernate, EclipseLink) using `EntityManager`.
3. `HibernateTransactionManager`: for Hibernate, directly integrating with the `SessionFactory`.
4. `JtaTransactionManager`: Handles distributed/global transactions using JTA, coordinating transactions across multiple resources.
5. `JmsTransactionManager`: for Java Message Service operations, ensuring message sending/receiving is transactional.

### <a id="using-spring-transaction-management"></a> 8.4. Using Spring Transaction Management:
Spring provides a **declarative** and **programmatic** approach to transaction management.

#### Programmatic Transactions:
- `PlatformTransactionManager`: An interface that defines how transactions are started, committed, and rolled back.
    - Independent of the underlying technology (JDBC, JPA, Hibernate, etc.).
- `TransactionTemplate`: A **helper class** that wraps `PlatformTransactionManager` to simplify programmatic transactions.

```java
transactionTemplate.execute(status -> {
    // code inside transaction
    myRepository.save(entity);
    return null;
});
```

#### Declarative Transactions:
- Annotations are used to define transactional behavior at the method or class level. (**Recommended**)
- Common Annotations:
    - `@EnableTransactionManagement`: Enable transaction support Java configuration.
    - `@Transactional`: Marks a method or class as transactional.

- When a method is annotated with `@Transactional` in Spring:
    1. A proxy is created around the class.
    2. The proxy intercepts calls to the method.
    3. The proxy checks the annotation settings to start or join a transaction using `PlatformTransactionManager`.
    4. The actual method runs within the transaction.
    5. If the method succeeds, the transaction is committed; if it fails, it is rolled back.

```java
@Configuration
@EnableJpaRepositories
@EnableTransactionManagement // Enables transaction management in the application
public class AppConfig {
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new JpaTransactionManager(dataSource); // Configures the JPA transaction manager with the datasource
    }
}

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository; // Assume this is a JPA repository

    @Transactional // Marks the method as transactional
    public void createUser(User user) {
        userRepository.save(user); // This operation will be part of a transaction
    }
}
```

### <a id="rollback"></a> 8.5. Rollback:
- By default, Spring rolls back a transaction when a `RuntimeException` / `java.lang.Error` (unchecked exceptions) is thrown.
- `rollbackFor` and `noRollbackFor` are used to customize rollback behavior.

```java
@Transactional(rollbackFor = {Exception.class}, noRollbackFor = {NullPointerException.class})
public void processTransaction() { ... }
```

### <a id="local-vs-global-distributed-transaction-management"></a> 8.6. Local vs. Global (Distributed) Transaction Management:
- Spring supports both:
    - Local transactions (single resource).
    - Global/distributed transactions (multiple resources coordinated together).

#### <a id="local-transaction-management"></a> 8.6.1. Local Transaction Management:
- Managed by Spring's resource-specific transaction managers:
    - `DataSourceTransactionManager` (for plain JDBC)
    - `JpaTransactionManager` (for JPA providers like Hibernate)
    - `HibernateTransactionManager` (direct Hibernate integration)

```java
@Transactional
public void transferFunds(Long fromId, Long toId, BigDecimal amount) {
    accountRepository.debit(fromId, amount);
    accountRepository.credit(toId, amount);
}
```

#### <a id="global-distributed-transaction-management"></a> 8.6.2. Global (Distributed) Transaction Management:
- Involves multiple transactional resources participating in the same unit of work.
    - *Examples*: two databases, or a database and a message broker.
- Integrated with an external **transaction coordinator** like `Atomikos`, `Bitronix`, or `Narayana`.
- Distributed transactions are generally discouraged in modern, cloud-native, and microservice-based systems.
- **Alternatives**:        
    - Saga Pattern: Chain of local transactions. With compensating actions for rollback. Can be orchestrated or event-driven.
    - Event-Driven Architecture: Services emit and react to events.

### <a id="transaction-isolation-levels"></a> 8.7. Transaction Isolation Levels:
- Controls how and when changes made by one transaction become visible to others.
- Weak transaction isolation levels can produce _read anomalies_:
    - **Dirty Read**: Read uncommitted data from another transaction.
    - **Non-Repeatable Read**: Re-reading same row gives different result due to update.
    - **Phantom Read**: New rows appear in a repeated range query.

- Isolation Levels:
    - `READ_UNCOMMITTED`:  ✅ Dirty Read, ✅ Non-Repeatable Read, ✅ Phantom Read
    - `READ_COMMITTED`:  ❌ Dirty Read, ✅ Non-Repeatable Read, ✅ Phantom Read
    - `REPEATABLE_READ`:  ❌ Dirty Read, ❌ Non-Repeatable Read, ✅ Phantom Read
    - `SERIALIZABLE`:  ❌ Dirty Read, ❌ Non-Repeatable Read, ❌ Phantom Read

```java
@Transactional(isolation = Isolation.REPEATABLE_READ)
public void readAccountDetails() {
    // Will prevent dirty and non-repeatable reads
}
```

### <a id="transaction-propagation"></a> 8.8. Transaction Propagation:
Transaction propagation determines how transactions are managed when one transactional method calls another.
- `REQUIRED`:
    - Joins the current transaction if one exists; otherwise, it starts a new transaction.
    - Everything runs in a single transaction.
    - Most common and safest choice for service methods.
- `REQUIRES_NEW`:
    - Always starts a new transaction, suspending any existing one.
    - Useful when the inner operation must commit or roll back independently, like logging, auditing, or retry logic.
- `SUPPORTS`:
    - Joins the current transaction if one exists; otherwise, it runs without a transaction.
    - No new transaction is created.
    - Good for read-only methods that can work with or without a transaction.
- `NOT_SUPPORTED`:
    - Runs without a transaction. If a transaction is active, it is suspended during execution.
    - Useful when calling non-transactional systems like external APIs to avoid transactional overhead.
- `MANDATORY`:
    - Requires an existing transaction. If there isn't one, it throws an exception.
    - Use when the method must be part of a larger transaction managed by the caller.
- `NEVER`:
    - Must run outside any transaction. If a transaction exists, it throws an exception.
    - Use to ensure that certain logic never participates in a transaction, like direct system calls.
- `NESTED`:
    - Joins the current transaction and creates a `savepoint`.
    - If no transaction exists, it starts a new one (like `REQUIRED`).
    - Allows rolling back just the inner part without affecting the outer transaction.
    - `REQUIRES_NEW` saves its changes even if the outer method fails, but `NESTED` will lose its changes if the outer method fails.

```java
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void processPayment(Payment payment) { paymentRepository.save(payment); }
```

- When a method calls another method within the same class, transaction propagation rules do not apply because they bypass the Spring proxy that manages transactions.

