---
title: Activiti入门
createTime: 2024/11/24 15:56:15
permalink: /notes/java/udztm4dv/
---
官网：https://www.activiti.org/documentation

Activiti工作流实战开发：https://xuzhongcn.github.io/activ

## SpringBoot集成Activiti7

### 引入依赖

*pom.xml*

```xml
<properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

    <spring-boot.version>2.7.18</spring-boot.version>
    <activiti.version>7.1.0.M6</activiti.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>${spring-boot.version}</version>
            <scope>import</scope>
            <type>pom</type>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.activiti</groupId>
        <artifactId>activiti-spring-boot-starter</artifactId>
        <version>7.1.0.M6</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 配置

核心配置

```properties
server.port=8080
spring.application.name=quickstart
# 数据源
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://192.168.95.129:3306/activiti7?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.type=org.springframework.jdbc.datasource.SimpleDriverDataSource
# activiti
spring.activiti.database-schema=activiti7
spring.activiti.database-schema-update=true
spring.activiti.check-process-definitions=false
spring.activiti.db-history-used=true
spring.activiti.history-level=full
```

另外，Activiti7的身份认证使用的是SpringSecurity，其Starter自动配置`UserGroupManager`，依赖一个`UserDetailsService` Bean。源码如下：

```java
@Configuration
public class ActivitiSpringIdentityAutoConfiguration {
    @Bean
    @ConditionalOnMissingBean
    public UserGroupManager userGroupManager(UserDetailsService userDetailsService) {
        return new ActivitiUserGroupManagerImpl(userDetailsService);
    }
}
```

所以，还需要注入一个`UserDetailsService` Bean。如下：

```java
@Bean
public UserDetailsService userDetailsService() {
    UserDetails admin = User.builder()
            .username("admin")
            .password("admin")
            .roles("ADMIN")
            .build();
    return new InMemoryUserDetailsManager(admin);
}
```

最后，Activiti还必须配置一个Datasource，这里使用Spring提供的数据源实现

```properties
spring.datasource.type=org.springframework.jdbc.datasource.SimpleDriverDataSource
```

*activiti-spring-boot-starter*自动完成以下操作：

- 自动配置流程引擎`ProcessEngine`
- 自动初始化流程数据库表
- 自动注入流程常用的流程服务Bean：`RepositoryService`、`TaskService`、`runtimeService`等

## 使用自定义配置文件

创建activiti配置文件

*activiti.cfg.xml*

```properties
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource" destroy-method="close">
        <property name="jdbcUrl" value="jdbc:mysql://172.18.116.109:3306/activiti?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;allowPublicKeyRetrieval=true"/>
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="username" value="root"/>
        <property name="password" value="root"/>
    </bean>

    <bean id="processEngineConfiguration" class="org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration">
        <property name="dataSource" ref="dataSource"/>
        <property name="databaseSchemaUpdate" value="true"/>
        <property name="asyncExecutorActivate" value="true"/>
        <property name="dbHistoryUsed" value="true"/>
        <property name="historyLevel" value="NONE"/>
    </bean>
</beans>
```

加载流程配置文件，创建`ProcessEngine`对象，生成流程数据库表

```java
/**
 * 获取流程引擎对象, 自动创建Activiti数据表
 */
@Test
public void testProcessEngine() {
    // ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();

    ProcessEngineConfiguration processEngineConfiguration = ProcessEngineConfiguration.createProcessEngineConfigurationFromResource("activiti.cfg.xml");
    ProcessEngine processEngine = processEngineConfiguration.buildProcessEngine();
    String processEngineName = processEngine.getName();
    System.out.println(processEngineName);
}
```

## 部署流程

```java
@Resource
private RepositoryService repositoryService;

@Test
public void testDeployBPMN() {
    // ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    // RepositoryService repositoryService = processEngine.getRepositoryService();
    
    Deployment deployment = repositoryService.createDeployment()
        ..key("MY_PROCESS")
        .name("quickstart")
        .addClasspathResource("processes/MyProcess.bpmn20.xml")
        .deploy();
    System.out.printf("id=%s, name=%s, time=%s%n", deployment.getId(), deployment.getName(), deployment.getDeploymentTime());
}
```

## 查询流程信息

```java
@Resource
private RepositoryService repositoryService;

@Test
public void testQueryProcesses() {
    // ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    // RepositoryService repositoryService = processEngine.getRepositoryService();

    // 查询流程部署信息
    DeploymentQuery deploymentQuery = repositoryService.createDeploymentQuery();
    List<Deployment> deploymentList = deploymentQuery.list();
    for (Deployment deployment : deploymentList) {
        System.out.printf("id=%s, name=%s, deploymentTime=%s%n", deployment.getId(), deployment.getName(), deployment.getDeploymentTime());
    }

    // 查询流程定义信息
    ProcessDefinitionQuery processDefinitionQuery = repositoryService.createProcessDefinitionQuery();
    List<ProcessDefinition> processDefinitionList = processDefinitionQuery.list();
    for (ProcessDefinition processDefinition : processDefinitionList) {
        System.out.printf("id=%s, name=%s, resourceName=%s%n", processDefinition.getId(), processDefinition.getName(), processDefinition.getResourceName());
    }
}
```

## 删除流程信息

```java
@Resource
private RepositoryService repositoryService;

@Test
public void testDeleteProcess(){
    // ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    // RepositoryService repositoryService = processEngine.getRepositoryService();

    // 删除流程部署信息和流程定义信息
    String deploymentId = "2501";
    repositoryService.deleteDeployment(deploymentId);
}
```

## 启动流程实例



## 查询待办任务

## 审批任务



## 查询已办任务

## 回退任务



## 结束任务