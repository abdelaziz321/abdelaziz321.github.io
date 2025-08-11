---
title: Diving Deeper Into Spring Testing (3)
description: In this part, I explore Spring’s testing support — from JUnit and Mockito basics to integration testing, slice testing, security testing, and Testcontainers. Here are the notes I collected while diving deep into making Spring apps testable and reliable.
---

In this part, I explore Spring’s testing support — from JUnit and Mockito basics to integration testing, slice testing, security testing, and Testcontainers. Here are the notes I collected while diving deep into making Spring apps testable and reliable. Happy reading 🙂

---

- **1. [Basics of Testing](#basics-of-testing)**
- **2. [Testing Types by Purpose](#testing-types-by-purpose)**
- **3. [Testing Types by Scope](#testing-types-by-scope)**
- **4. [JUnit Testing Framework](#junit-testing-framework)**
    - 4.1. [JUnit 4: Runner-Based Model](#junit-4-runner-based-model)
    - 4.2. [JUnit 5: Platform & Extension Model](#junit-5-platform-extension-model)
    - 4.3. [JUnit Example](#junit-example)
- **5. [Mockito](#mockito)**
    - 5.1. [Standard Mocking](#standard-mocking)
    - 5.2. [Behavior-Driven Style with BDDMockito](#behavior-driven-style-with-bddmockito)
- **6. [Spring Testing](#spring-testing)**
    - 6.1. [Test Dependencies](#test-dependencies)
    - 6.2. [Spring TestContext Framework](#spring-testcontext-framework)
        - 6.2.1. [Lifecycle Integration with JUnit](#lifecycle-integration-with-junit)
        - 6.2.2. [Context Loading with @ContextConfiguration](#context-loading-with-contextconfiguration)
        - 6.2.3. [Boot Context with @SpringBootTest](#boot-context-with-springboottest)
        - 6.2.4. [Using @TestConfiguration](#using-testconfiguration)
        - 6.2.5. [Field and Parameter Injection](#field-and-parameter-injection)
        - 6.2.6. [Customizing the Test Environment](#customizing-the-test-environment)
        - 6.2.7. [Context Caching and @DirtiesContext](#context-caching-and-dirtiescontext)
    - 6.3. [Spring Boot Integration Testing](#spring-boot-integration-testing)
        - 6.3.1. [Web Environment Modes](#web-environment-modes)
        - 6.3.2. [Using TestRestTemplate](#using-testresttemplate)
    - 6.4. [Slice Testing (Lightweight Contexts)](#slice-testing-lightweight-contexts)
        - 6.4.1. [Examples](#slice-testing-examples)
    - 6.5. [Mocking and Substituting Beans](#mocking-and-substituting-beans)
    - 6.6. [Testing MVC Controllers](#testing-mvc-controllers)
    - 6.7. [Database Testing](#database-testing)
    - 6.8. [Spring Security Testing](#spring-security-testing)
    - 6.9. [Integration Testing with Testcontainers](#integration-testing-with-testcontainers)
        - 6.9.1. [Common Containers](#common-containers)
        - 6.9.2. [GCP Service Emulators](#gcp-service-emulators)
- **7. [Best Practices](#best-practices)**
    - 7.1. [Prefer Environment Over @Value](#prefer-environment-over-value)
    - 7.2. [Use @SpringJUnitConfig Over Heavy Contexts](#use-springjunitconfig-over-heavy-contexts)
    - 7.3. [Separate Unit vs Integration Tests](#separate-unit-vs-integration-tests)
    - 7.4. [Verify Transaction Behavior](#verify-transaction-behavior)
    - 7.5. [Verify Query Counts](#verify-query-counts)
    - 7.6. [Use @Commit for Data Persistence](#use-commit-for-data-persistence)
    - 7.7. [Measure Query Performance with @Timed](#measure-query-performance-with-timed)

---

## <a id="basics-of-testing"></a> 1. Basics of Testing
- **Test Case**: A unit of testing that checks if a function produces the expected result for a given input.
- **Test Suite**: A group of related test cases.
- **Mocking**: Faking dependencies like APIs or databases in tests.
- **Test Coverage**: How much of code is tested (usually in %).
- **Assertion**: A statement in a test that checks if the actual output matches expected output.
- **TDD (Test-Driven Development)**: Writing tests before writing code.

---

## <a id="testing-types-by-purpose"></a> 2. Testing Types by Purpose
- **Functional Testing**:
    - Checks if features work as expected (e.g., API returns correct data).
    - Example: using `@WebMvcTest`.
- **Non-Functional Testing**: Covers quality aspects beyond correctness.
    - **Performance Testing**: Measures speed and stability under load.
    - **Security Testing**: Finds vulnerabilities (e.g., SQL injection).
- **Acceptance Testing**:
    - Validates business requirements (UAT).
- **Behavior-Driven Development**:
    - Tests in natural language to align with business.
    - Example: using `Cucumber` or `JBehave` with Spring.
- **Mutation Testing**:
    - Mutates code to test if existing tests catch the changes.
    - If a test fails due to the mutation, it is considered effective.
    - Example: using PIT (Pitest).
- **Continuous Testing**:
    - Auto-runs tests in CI/CD pipelines.
    - Example: using `Jenkins` or `GitHub Actions` with Spring Boot tests.

---

## <a id="testing-types-by-scope"></a> 3. Testing Types by Scope
- **Unit Testing**:
    - Tests individual classes/methods in isolation.
    - `@Test void calculate() { assertEquals(10, calculator.add(4,6)); }`
- **Integration Testing**:
    - Tests component interactions.
    - `@DataJpaTest void saveUser() { repository.save(user); assertNotNull(user.getId()); }`
- **System Testing**:
    - Tests full application.
    - `@SpringBootTest void healthCheck() { restTemplate.getForEntity("/health", String.class); }`
- **End-To-End Testing**:
    - Tests complete user flows.
    - `@Testcontainers void checkoutFlow() { API → DB → Payment → Email; }`
- **Regression Testing**:
    - Re-tests existing features.
    - `@Tag("regression") void legacyLogin() { /* Old auth still works */ }`

---

## <a id="junit-testing-framework"></a> 4. JUnit Testing Framework
- A library for writing and running repeatable unit tests in Java.
- In Spring-based projects, JUnit 5 is the standard testing framework for unit and integration tests.

### <a id="junit-4-runner-based-model"></a> 4.1. JUnit 4: Runner-Based Model
- A **Runner** is the central component that locates test methods, manages the test lifecycle, injects dependencies, and reports results.
- Every test class is executed by a single `Runner` (e.g., `BlockJUnit4ClassRunner`, `SpringRunner`, `MockitoJUnitRunner`).

```java
@RunWith(SpringRunner.class)          // Enables Spring support
// @RunWith(MockitoJUnitRunner.class)  // Only one runner allowed. Can't use both at once
public class JUnit4Test {
    @Mock
    private MyService myService;

    @Test
    public void testSomething() { /* Mockito.initMocks(this) needed manually */ }
}
```

### <a id="junit-5-platform-extension-model"></a> 4.2. JUnit 5: Platform & Extension Model
- **JUnit Platform**: Core engine that discovers and executes tests. (needed for both JUnit 4 & 5).
- **JUnit Jupiter**: The modern JUnit 5 way of writing tests (used in Spring Boot 2.2+).
    - Test Annotation: `@Test` (from `org.junit.jupiter.api`)
    - Before/After: `@BeforeEach`, `@AfterEach`
    - Test Runner: `@ExtendWith(SpringExtension.class)`
    - Dynamic Tests: Supports `@DynamicTest`
    - Dependency: `spring-boot-starter-test` (auto-includes)
- **JUnit Vintage**: A compatibility layer to run old JUnit 4 tests on JUnit 5.
    - Test Annotation: `@Test` (from `org.junit`)
    - Before/After: `@BeforeEach`, `@AfterEach`
    - Test Runner: `@ExtendWith(SpringRunner.class)`
    - Dynamic Tests: *Not supported*
    - Dependency: Requires `junit-vintage-engine`
- **Extensions**: Lightweight, composable hooks (like `SpringExtension`, `MockitoExtension`) that plug into specific test phases.

```java
// Multiple extensions allowed
@ExtendWith({SpringExtension.class, MockitoExtension.class})
public class JUnit5Test {
    @Mock
    private MyService myService;

    @Test
    void testSomething() { /* Mockito mock is auto-injected */ }
}
```

> **Spring** needs to participate in the test lifecycle to set up the `ApplicationContext`, inject objects, and manage the database during tests.
> - In **JUnit 4**, `@RunWith` replaces the default runner (only one runner allowed).
> - In **JUnit 5**, `@ExtendWith` adds extensions to the test class (multiple extensions allowed).

### <a id="junit-example"></a> 4.3. JUnit Example

```java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    // Runs once before ALL tests (e.g., setup expensive resources)
    @BeforeAll
    static void initAll() {
        System.out.println("Initializing test class...");
    }

    // Runs before EACH test (e.g., reset state)
    @BeforeEach
    void init() {
        System.out.println("Preparing test...");
    }

    // A test case
    @Test
    @DisplayName("2 + 2 should equal 4")
    void testAddition() {
        Calculator calculator = new Calculator();
        assertEquals(4, calculator.add(2, 2), "2 + 2 must be 4");
    }

    // Another test case
    @Test
    @Disabled("Temporarily disabled for debugging")
    void testSubtraction() {
        Calculator calculator = new Calculator();
        assertEquals(1, calculator.subtract(3, 2));
    }

    // Runs after EACH test (e.g., cleanup)
    @AfterEach
    void tearDown() {
        System.out.println("Cleaning up...");
    }

    // Runs once after ALL tests
    @AfterAll
    static void tearDownAll() {
        System.out.println("All tests finished!");
    }
}
```

---

## <a id="mockito"></a> 5. Mockito

### <a id="standard-mocking"></a> 5.1. Standard Mocking
- Used to test classes in isolation by mocking external dependencies.

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock  // to mock dependencies
    private UserRepository userRepository;

    @InjectMocks  // to inject them into the class under test
    private UserService userService;

    @Test
    void createUser_ShouldSaveUser_WhenEmailIsUnique() {
        // Arrange
        User newUser = new User("test@example.com", "John Doe");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(newUser);

        // Act
        User result = userService.createUser(newUser);

        // Assert
        verify(userRepository).save(newUser);
        assertEquals("John Doe", result.getName());
    }
}
```

### <a id="behavior-driven-style-with-bddmockito"></a> 5.2. Behavior-Driven Style with BDDMockito
- Mockito provides a BDD-style API through `BDDMockito` for more readable tests:

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    User user = new User(1L, "Test User");

    @Test
    void testUserRepository() {
        // BDDMockito setup
        given(userRepository.findById(anyLong()))
            .willReturn(Optional.of(user))      // First call returns user
            .willThrow(new RuntimeException()); // Second call throws

        // Test happy path
        assertThat(userService.getUserById(1L)).isEqualTo(user);

        // Test error case
        assertThatThrownBy(() -> userService.getUserById(2L))
            .isInstanceOf(RuntimeException.class);
    }
}
```

---

## <a id="spring-testing"></a> 6. Spring Testing

### <a id="test-dependencies"></a> 6.1. Test Dependencies
The `spring-boot-starter-test` starter (with `test` scope) includes:
- JUnit 5 (`junit-jupiter`)
- Spring Test
- Mockito
- AssertJ, Hamcrest, JSONassert, etc.

### <a id="spring-testcontext-framework"></a> 6.2. Spring TestContext Framework

#### <a id="lifecycle-integration-with-junit"></a> 6.2.1. Lifecycle Integration with JUnit
- The `TestContext` Framework is activated via `SpringRunner` or `SpringExtension`.
- Under the hood, both:
    - Initialize a `TestContextManager`
    - Load the application context (from `@ContextConfiguration`, etc.)
    - Inject beans
    - Manage test execution lifecycle (before/after methods)
    - Handle transactions, `@DirtiesContext`, etc.

#### <a id="context-loading-with-contextconfiguration"></a> 6.2.2. Context Loading with @ContextConfiguration
- `@ContextConfiguration`: Loads only the explicitly defined config classes, not the full Spring Boot context.
- `@SpringJUnitConfig`: Combines `@ExtendWith(SpringExtension.class)` + `@ContextConfiguration`.

```java
@SpringJUnitConfig(classes = MyTestConfig.class) // Combines @ExtendWith + @ContextConfiguration
class MyServiceTest {
    @Test
    void testFeatureEnabled() {}
}
```

#### <a id="boot-context-with-springboottest"></a> 6.2.3. Boot Context with @SpringBootTest
- `@SpringBootTest` loads the full Spring Boot application context (includes `@SpringJUnitConfig`).
- Internally relies on `@ContextConfiguration`.
- `@SpringBootTest` loads the application context by locating a class annotated with `@SpringBootConfiguration`.
    - Since `@SpringBootApplication` includes `@SpringBootConfiguration`, the main application class is used by default.

```java
@SpringBootTest
class MyServiceTest {}
```

#### <a id="using-testconfiguration"></a> 6.2.4. Using @TestConfiguration
- `@TestConfiguration`: Allows defining test-only beans inside test classes.

```java
@SpringJUnitConfig(classes = MyTestConfig.class)
class MyServiceTest {

    @Autowired
    private MyService myService;

    @Test
    void testFeature() { Assertions.assertTrue(myService.isFeatureEnabled()); }

    @TestConfiguration  // Test-scoped configuration (not used in app runtime)
    static class MyTestConfig {
        @Bean
        public MyService myService() {
            return new MyServiceImpl(true);
        }

        @Bean
        public MyRepository myRepository() {
            return Mockito.mock(MyRepository.class);
        }
    }
}
```

#### <a id="field-and-parameter-injection"></a> 6.2.5. Field and Parameter Injection
- Dependencies injected through field injection are available in all test methods.

```java
@SpringBootTest
class MyServiceTest {
    @Autowired      // Field injection — available in all test methods
    private MyService myService;

    @Test
    void testWithFieldInjection() {
        Assertions.assertTrue(myService.isFeatureEnabled());
    }

    @Test
    void testWithMethodParamInjection(@Autowired MyRepository myRepository) {  // Parameter injection
        Assertions.assertNotNull(myRepository);
    }
}
```

#### <a id="customizing-the-test-environment"></a> 6.2.6. Customizing the Test Environment
- `@TestPropertySource`: Overrides application properties during tests.
- `@ActiveProfiles`: Activates specific Spring profiles.

```java
@SpringBootTest(classes = MyTestConfig.class)
@TestPropertySource(
    properties = "feature.enabled=true",
    locations = "classpath:test-override.properties"
)
@ActiveProfiles("test")
class MyServiceTest {
    @Test
    void testFeatureEnabled() {}
}
```

#### <a id="context-caching-and-dirtiescontext"></a> 6.2.7. Context Caching and @DirtiesContext
- Spring caches the `ApplicationContext` between tests to improve performance.
- `@DirtiesContext`: Invalidates the context to force reloading for the next test.
    - Used when a test modifies beans or environment in a way that affects other tests.

### <a id="spring-boot-integration-testing"></a> 6.3. Spring Boot Integration Testing

#### <a id="web-environment-modes"></a> 6.3.1. Web Environment Modes
`@SpringBootTest(webEnvironment = ...)` configures the Spring Boot embedded web server.
    - `MOCK`: No real server started. Uses `MockMvc` internally.
    - `RANDOM_PORT`: Starts a real HTTP server on a random port.
    - `DEFINED_PORT`: Starts a server on the port defined in `application.properties`.
    - `NONE`: No web environment at all. For pure unit tests or when using mocks.

#### <a id="using-testresttemplate"></a> 6.3.2. Using TestRestTemplate
- Uses the actual HTTP layer. Designed to behave like `RestTemplate`, but configured for tests.

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserControllerIntegrationTest {

    @LocalServerPort               // Injects the actual port number assigned at runtime
    private int port;

    @Value("${local.server.port}") // The same
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testGetUser() {
        ResponseEntity<User> response = restTemplate.getForEntity("/api/users/1", User.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().getId());
    }
}
```

### <a id="slice-testing-lightweight-contexts"></a> 6.4. Slice Testing (Lightweight Contexts)

#### <a id="slice-testing-examples"></a> 6.4.1. Examples

```java
@WebMvcTest(controllers = {UserController.class, ProductController.class})
class UserControllerTest {}

@DataJpaTest
class UserRepositoryTest {}
```

### <a id="mocking-and-substituting-beans"></a> 6.5. Mocking and Substituting Beans
- `@MockBean` replaces a Spring-managed bean in the application context.
- `@Mock` creates a standalone mock used in pure unit tests without Spring context.

```java
@SpringBootTest
@MockBean(UserRepository.class) // replaces the bean, but not injected into a field
class OrderServiceTest {

    @MockBean
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @Test
    void testProcessOrder() {
        when(paymentService.process(any())).thenReturn(true);

        boolean result = orderService.processOrder(new Order());
        assertTrue(result);
    }
}
```

### <a id="testing-mvc-controllers"></a> 6.6. Testing MVC Controllers
- Testing web controllers using mock servlet environments without starting a full web server.
- `@WebMvcTest` sets up a minimal Spring MVC context containing the controller under test and the MVC components.
- The `ResultActions` object returned by `mockMvc.perform()` allows chaining assertions:

```java
@WebMvcTest(UserController.class)  // Load only MVC components (UserController and related)
@AutoConfigureMockMvc              // Enable MockMvc injection
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldReturnUserDetails() throws Exception {
        // Arrange: Prepare mocked service behavior
        User user = new User(1L, "Aziz");
        when(userService.findById(1L)).thenReturn(user);

        // Act
        mockMvc.perform(
            MockMvcRequestBuilders.get("/users/{id}", 1L)
                .header("Authorization", "Bearer token123")
        )
        .andDo(MockMvcResultHandlers.print())                                                // Print request/response

        // Assert
        .andExpect(MockMvcResultMatchers.status().isOk())                                    // Expect 200 OK status
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Aziz"))                   // Expect JSON field 'name' = Aziz
        .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON)); // Expect correct content type
    }
}
```

### <a id="database-testing"></a> 6.7. Database Testing
- `@Sql`: Run SQL scripts before or after tests.
- By default, Spring rolls back transactions at the end of each test.

```java
@SpringBootTest
@Sql(scripts = "/setup.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/cleanup-test-data.sql", executionPhase = AFTER_TEST_METHOD)
class DatabaseTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    void testUserExists() {
        assertTrue(userRepository.findAll().size() > 0);
    }
}
```

### <a id="spring-security-testing"></a> 6.8. Spring Security Testing
- Spring Security tests are supported via the `spring-security-test` module.
- `@WithMockUser(roles = {...})`: Simulates an authenticated user with specific roles (bypasses login).
- `@WithUserDetails("mary")`: Loads a real user named `"mary"` from the configured `UserDetailsService`.
    - The user must exist before the test method runs. `@Sql` or `@BeforeEach` can be utilized for that purpose.

```java
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc
class UserControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test    // Public endpoint: accessible without authentication
    void shouldAllowAnonymousAccessToPublicEndpoint() throws Exception {
        mockMvc.perform(get("/public"))
            .andExpect(status().isOk());
    }

    @Test    // Protected endpoint: should be forbidden without login
    void shouldRejectAccessToProtectedEndpointWithoutAuth() throws Exception {
        mockMvc.perform(get("/users/me"))
            .andExpect(status().isUnauthorized());
    }

    @Test    // Admin-only endpoint: should succeed only with proper role
    @WithMockUser(username = "user", roles = {"USER"})
    void shouldDenyAccessToAdminEndpointWithoutRole() throws Exception {
        mockMvc.perform(get("/admin"))
            .andExpect(status().isForbidden());
    }

    @Test    // Real user loaded from UserDetailsService (requires user "mary" to be present in test DB)
    @WithUserDetails("mary")
    void shouldAllowAccessWithRealUser() throws Exception {
        mockMvc.perform(get("/users/me"))
            .andExpect(status().isOk());
    }
}
```

### <a id="integration-testing-with-testcontainers"></a> 6.9. Integration Testing with Testcontainers
- A Java library that provides lightweight, disposable containers using Docker.
- Provides real integration. In-memory DBs like H2 may behave differently than production DBs.

#### <a id="common-containers"></a> 6.9.1. Common Containers
- `PostgreSQLContainer`, `MySQLContainer`, `MongoDBContainer`
- `KafkaContainer`, `RabbitMQContainer`, `ElasticsearchContainer`
- `GenericContainer`

```java
@SpringBootTest
@Testcontainers // Optional in JUnit 5+, but clarifies usage
class UserRepositoryTest {

    @Container // starts before the tests. `static` shares the same container across all tests in a class
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource // Override Spring properties dynamically
    static void overrideProps(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    void testUserPersistence() {
        User user = new User("aziz@example.com");
        userRepository.save(user);
        assertThat(userRepository.findByEmail("aziz@example.com")).isPresent();
    }
}
```

#### <a id="gcp-service-emulators"></a> 6.9.2. GCP Service Emulators

```java
@Testcontainers
@SpringBootTest
class PubSubEmulatorTest {

    @Container
    static GenericContainer<?> pubsubEmulator = new GenericContainer<>("google/cloud-sdk")
            .withCommand("gcloud beta emulators pubsub start --host-port=0.0.0.0:8085")
            .withExposedPorts(8085);

    @DynamicPropertySource
    static void setEmulatorProps(DynamicPropertyRegistry dynamicPropertyRegistry) {
        dynamicPropertyRegistry.add(
            "spring.cloud.gcp.pubsub.emulator-host",
            () -> "http://" + pubsubEmulator.getHost() + ":" + pubsubEmulator.getMappedPort(8085)
        );
    }

    @Autowired
    PubSubTemplate pubSubTemplate;

    @Test
    void publishMessage() {
        pubSubTemplate.publish("demo-topic", "Hello GCP!");
        // Add basic assertion or log output
    }
}
```

---

## <a id="best-practices"></a> 7. Best Practices

### <a id="prefer-environment-over-value"></a> 7.1. Prefer Environment Over @Value
- **Problem**: Using `@Value` tightly couples the class to Spring’s DI container, making unit tests slower and more complex.
- **Solution**: Inject Spring’s `Environment` interface instead, enabling lightweight testing with `MockEnvironment`.

```java
// Environment injection (testable without Spring)
public class PaymentService {
    private final Environment env;

    public PaymentService(Environment env) {
        this.env = env;
    }

    public int getTimeout() {
        return env.getProperty("payment.timeout", Integer.class, 5000);
    }
}

// Fast unit test (no Spring)
class OrderServiceTest {
    @Test
    void testPaymentTimeout() {
        MockEnvironment env = new MockEnvironment();
        env.withProperty("payment.timeout", "3000");

        PaymentService service = new PaymentService(env);
        assertThat(service.getTimeout()).isEqualTo(3000);
    }
}
```

### <a id="use-springjunitconfig-over-heavy-contexts"></a> 7.2. Use @SpringJUnitConfig Over Heavy Contexts
- **Problem**: `@SpringBootTest` loads unnecessary components, slowing tests.
- **Solution**: Load only required configurations.

```java
@SpringJUnitConfig(classes = {ServiceConfig.class, TestMocks.class})
class FastIntegrationTest {
    @Autowired
    private OrderService orderService; // Lightweight context
}
```

### <a id="separate-unit-vs-integration-tests"></a> 7.3. Separate Unit vs Integration Tests
- **Problem**: Slow tests delay feedback.
- **Solution**: Segregate tests using JUnit 5 tags.

```java
// Unit test (fast)
@Tag("UnitTest")
class PaymentServiceTest { /* ... */ }

// Integration test (slow)
@Tag("IntegrationTest")
@SpringBootTest
class PaymentServiceIT { /* ... */ }
```

Then run selectively:

```bash
mvn test -Dgroups="UnitTest"
```

### <a id="verify-transaction-behavior"></a> 7.4. Verify Transaction Behavior
- **Problem**: Incorrect transaction boundaries cause data corruption.
- **Solution**: Explicitly test rollback scenarios.

```java
@SpringBootTest
@Transactional
class OrderServiceTest {
    @Test
    void createOrder_RollsBackOnFailure() {
        assertThrows(
            PaymentFailedException.class,
            () -> { orderService.createOrder(invalidOrder); }
        );
        assertThat(orderRepository.count()).isEqualTo(0); // Verify rollback
    }
}
```

### <a id="verify-query-counts"></a> 7.5. Verify Query Counts
- **Problem**: Lazy loading causes performance issues.
- **Solution**: Verify query counts with `JPAQueryInspector`.

```java
@SpringBootTest
@Transactional
class OrderServiceTest {
    @Test
    void getOrderWithItems_ExecutesSingleQuery() {
        QueryCountHolder.clear();
        orderService.getOrderWithItems(1L);
        assertThat(QueryCountHolder.getSelectCount()).isEqualTo(1);
    }
}
```

### <a id="use-commit-for-data-persistence"></a> 7.6. Use @Commit for Data Persistence
- **Problem**: `@Transactional` rolls back test data by default, making it unavailable for subsequent tests or manual inspection.
- **Solution**: Use `@Commit` to force transaction commits when needed.

```java
@SpringBootTest
@Transactional
class OrderServiceTest {
    @Test
    @Commit // Needed because audit system reads committed data
    void testAuditLogGeneration() {
        // Create and save a user (must commit to DB)
        User user = userRepository.save(new User("admin", "admin@company.com"));
    
        // Audit service reads from actual DB, not transaction
        List<AuditLog> logs = auditService.getUserCreationLogs(user.getId());
    
        assertFalse(logs.isEmpty()); // Fails without @Commit
    }
}
```

### <a id="measure-query-performance-with-timed"></a> 7.7. Measure Query Performance with @Timed
- **Problem**: Slow queries slip into production.
- **Solution**: Fail tests if queries exceed thresholds.

```java
@SpringBootTest
@Transactional
class OrderServiceTest {
    @Test
    @Timed(millis = 100)  // Fail if slower than 100ms
    void searchUsers_ResponseTime() {
        userRepository.searchComplexQuery("test");
    }
}
```
