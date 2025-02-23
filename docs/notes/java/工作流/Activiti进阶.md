---
title: Activiti进阶
createTime: 2024/11/24 15:56:15
permalink: /notes/java/qpbd05af/
---
## Activiti数据表

Activiti数据表分为以下几类：

- ACT_GE_XXX：general流程通用表
- ACT_RE_XXX：repository流程存储表，存放流程定义和部署信息
- ACT_RU_XXX：runtime运行时数据表，存放流程执行实例、任务、变量等信息
- ACT_HI_XXX：history流程历史数据表

Activiti数据表列表：

| 表名                  | 作用                                                       |
| :-------------------- | :--------------------------------------------------------- |
| ACT_GE_BYTEARRAY      | 通用字节资源数据表，存储流程定义文件、流程图片等二进制数据 |
| ACT_GE_PROPERTY       | 通用属性表，保存引擎级别的属性数据                         |
| ACT_RE_DEPLOYMENT     | 流程部署信息存储表                                         |
| ACT_RE_PROCDEF        | 流程定义信息存储表                                         |
| ACT_RE_MODEL          | 流程模型信息存储表                                         |
| ACT_RU_EXECUTION      | 运行时流程实例执行信息表                                   |
| ACT_RU_TASK           | 运行时流程任务信息表                                       |
| ACT_RU_VARIABLE       | 运行时流程变量信息表                                       |
| ACT_RU_IDENTITYLINK   | 运行时流程用户关系表                                       |
| ACT_RU_JOB            | 运行时作业表，即异步任务数据                               |
| ACT_RU_DEADLETTER_JOB | 运行时死信作业表，即无法执行的定时任务数据                 |
| ACT_RU_SUSPENDED_JOB  | 运行时被中断作业表，即中断的定时任务数据                   |
| ACT_RU_TIMER_JOB      | 运行时定时器作业表                                         |
| ACT_RU_EVENT_SUBSCR   | 运行时事件订阅信息表                                       |
| ACT_RU_INTEGRATION    |                                                            |
| ACT_HI_PROCINST       | 历史流程实例表                                             |
| ACT_HI_ACTINST        | 历史节点实例表                                             |
| ACT_HI_TASKINST       | 历史任务实例表                                             |
| ACT_HI_DETAIL         | 历史流程详情表                                             |
| ACT_HI_IDENTITYLINK   | 历史流程变量表                                             |
| ACT_HI_VARINST        | 历史流程运行过程中的用户关系表                             |
| ACT_HI_COMMENT        | 历史审批意见信息表                                         |
| ACT_HI_ATTACHMENT     | 历史附件信息表                                             |
| ACT_EVT_LOG           |                                                            |
| ACT_PROCDEF_INFO      |                                                            |

## `ProcessEngineConfiguration`：流程引擎配置

`ProcessEngineConfiguration`是Activiti的核心API接口，定义了用于配置流程、创建流程引擎实例、获取业务Service对象的方法和规范。具体实现类如下：

![](_\ProcessEngineConfiguration.png)

```properties
# datasource
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://192.168.95.129:3306/activiti7?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.type=org.springframework.jdbc.datasource.SimpleDriverDataSource

# activiti
# 数据库名称
spring.activiti.database-schema=activiti7
# 自动更新数据库表:启用
spring.activiti.database-schema-update=true
# 流程历史信息:启用
spring.activiti.db-history-used=true
spring.activiti.history-level=full
# 启动时检查数据库中保存的流程定义是否存在,并自动部署:关闭
spring.activiti.check-process-definitions=false
```

## `ProcessEngine`：工作流引擎

`ProcessEngine`是Activiti流程的核心，通过流程引擎配置获得，提供了获取所有Activiti服务的方法（实际是通过`ProcessEngineConfiguration`间接获取的）。源码如下：

```java
public interface ProcessEngine {

  /** the version of the activiti library */
  public static String VERSION = "7.0.0.0"; // Note the extra .x at the end. To cater for snapshot releases with different database changes

  /**
   * The name as specified in 'process-engine-name' in the activiti.cfg.xml configuration file. The default name for a process engine is 'default
   */
  String getName();

  void close();
  
  RepositoryService getRepositoryService();

  RuntimeService getRuntimeService();

  TaskService getTaskService();

  HistoryService getHistoryService();

  ManagementService getManagementService();
  
  DynamicBpmnService getDynamicBpmnService();

  ProcessEngineConfiguration getProcessEngineConfiguration();
}
```

## `RepositoryService`

`RepositoryService`用于部署流程、查询流程部署、挂起和激活定义、查询流程定义信息、删除流程数据。涉及以下数据表：

- ACT_RE_DEPLOYMENT，流程部署信息存储表
- ACT_RE_PROCDEF，流程定义信息存储表
- ACT_GE_BYTEARRAY，通用字节资源数据表

**部署流程**

```java
Deployment deployment = repositoryService.createDeployment()
        .tenantId("1") // 租户ID
        .category("测试流程") // 分类
        .key("leave") // 流程定义key
        .name("请假流程") // 流程定义名称
        .addClasspathResource("processes/leave.bpmn20.xml") // 部署资源文件
        .deploy();
```

**查询流程部署信息**

```java
List<Deployment> deployments = repositoryService.createDeploymentQuery()
        .deploymentKey("leave")
        .orderByDeploymenTime()
        .desc()
        .listPage(0, 10);
deployments.forEach(System.out::println);
```

**查询流程定义信息**

```java
List<ProcessDefinition> processDefinitions = repositoryService.createProcessDefinitionQuery()
        .processDefinitionKey("leave")
        .orderByProcessDefinitionVersion()
        .desc()
        .listPage(0, 10);
processDefinitions.forEach(System.out::println);
```

**挂起流程定义**

```java
// 挂起流程定义
String procDefId = "leave:1:41279a1e-cb6e-11ef-9ae7-986ee82ee222";
boolean processDefinitionSuspended = repositoryService.isProcessDefinitionSuspended(procDefId);
if (!processDefinitionSuspended){
    repositoryService.suspendProcessDefinitionById(procDefId);
}
```

**激活流程定义**

```java
String procDefId = "leave:1:41279a1e-cb6e-11ef-9ae7-986ee82ee222";
boolean processDefinitionSuspended = repositoryService.isProcessDefinitionSuspended(procDefId);
if (processDefinitionSuspended){
    repositoryService.activateProcessDefinitionById(procDefId);
}
```

**删除流程部署数据**

`deleteDeployment(String deploymentId, boolean cascade)`的第2个bool参数决定流程删除的行为：

- false，表示仅删除流程部署、流程定义以及资源数据，如果有正在运行的流程实例，则删除失败
- true，同时删除与流程部署相关的运行时数据和历史数据【生产环境慎用！】

```java
repositoryService.deleteDeployment("b0b5704e-cb69-11ef-b160-986ee82ee222", false);
```

## `RuntimeService`

`RuntimeService`用于启动流程实例、查询流程实例信息、挂起和激活流程、删除流程实例。

**启动流程实例**

启动流程（创建流程实例），涉及以下数据表：

- ACT_RU_EXECUTION，流程实例执行信息表
- ACT_RU_TASK，流程任务表
- ACT_RU_IDENTITYLINK，流程人员关系表

使用流程定义ID或流程定义Key启动流程。需要注意的是，当使用流程定义Key启动流程时，如果在部署流程时设置了租户ID，那么启动流程时必须指定tenantId参数

```java
String processDefinitionId = "leave:1:41279a1e-cb6e-11ef-9ae7-986ee82ee222"; // 流程定义ID
String processDefinitionKey = "leave"; // 流程定义Key
String businessKey = "bizID"; // 业务表ID
String tenantId = "1"; // 租户ID
// 使用流程定义ID启动流程
ProcessInstance processInstance = runtimeService.startProcessInstanceById(processDefinitionId, businessKey);
// 使用流程定义Key启动流程
ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(processDefinitionKey, businessKey);
// 使用流程定义Key启动流程，并传递租户ID
ProcessInstance processInstance = runtimeService.startProcessInstanceByKeyAndTenantId(processDefinitionKey, businessKey, tenantId);
```

**查询流程实例**

```java
// 查询流程实例
String processInstanceId = "6f808e15-cb76-11ef-ada4-986ee82ee222";
List<ProcessInstance> processInstances = runtimeService.createProcessInstanceQuery()
        .processDefinitionKey(processDefinitionKey)
        .listPage(0, 10);
processInstances.forEach(System.out::println);
```

**挂起流程实例**

```java
String processInstanceId = "6f808e15-cb76-11ef-ada4-986ee82ee222";
runtimeService.suspendProcessInstanceById(processInstanceId);
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
        .processInstanceId(processInstanceId)
        .singleResult();
System.out.println(processInstance.isSuspended()); // true
```

**激活流程实例**

```java
String processInstanceId = "6f808e15-cb76-11ef-ada4-986ee82ee222";
runtimeService.activateProcessInstanceById(processInstanceId);
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
        .processInstanceId(processInstanceId)
        .singleResult();
System.out.println(processInstance.isSuspended()); // false
```

**删除流程实例**

```java
String processInstanceId = "f31b1382-cb73-11ef-beeb-986ee82ee222";
String deleteReason = "删除原因";
runtimeService.deleteProcessInstance(processInstanceId, deleteReason);
```

## `TaskService`

`TaskService`用来查询待办任务、审批人完成任务、候选人拾取和归还任务。

涉及以下数据表：

- ACT_RU_TASK：运行时流程任务表
- ACT_RU_VARIABLE：运行时流程变量信息表

**查询待办任务**

```java
List<Task> tasks = taskService.createTaskQuery()
        // .deploymentId("3a79f997-ccf9-11ef-b13d-986ee82ee222")
        // .processDefinitionId("leave:1:3a9793b9-ccf9-11ef-b13d-986ee82ee222")
        // .processInstanceId("63774b4d-ccf9-11ef-b640-986ee82ee222")
        .taskAssignee("张三")
        // .taskCandidateUser("")
        // .taskCandidateGroup("")
        .listPage(0, 10);
tasks.forEach(System.out::println);
```

**审批人完成任务**

```java
String taskId = "637acdc1-ccf9-11ef-b640-986ee82ee222";
taskService.complete(taskId);
```

**候选人认领(拾取)任务**

给待分配的任务设置审批人

```java
String taskId = "48528984-ccff-11ef-8e40-986ee82ee222";
taskService.claim(taskId, "张三1");
Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
System.out.println(task.getAssignee());
```

**取消认领(归还)任务**

```java
String taskId = "48528984-ccff-11ef-8e40-986ee82ee222";
taskService.unclaim(taskId);
```

## `HistoryService`

`HistoryService`用来查询历史流程实例信息、历史活动实例(历史节点)、历史任务。

**查询历史流程实例**

```java
List<HistoricProcessInstance> historicProcessInstances = historyService.createHistoricProcessInstanceQuery()
        //.deploymentId("")
        //.processDefinitionId("leave:1:029ee85c-ccff-11ef-8356-986ee82ee222")
        //.processInstanceId("484eb8f0-ccff-11ef-8e40-986ee82ee222")
        .orderByProcessInstanceStartTime()
        .asc()
        .listPage(0, 20);
historicProcessInstances.forEach(System.out::println);
```

**查询历史活动实例(历史节点)**

```java
List<HistoricActivityInstance> historicActivityInstances = historyService.createHistoricActivityInstanceQuery()
        //.processDefinitionId("leave:1:029ee85c-ccff-11ef-8356-986ee82ee222")
        .processInstanceId("484eb8f0-ccff-11ef-8e40-986ee82ee222")
        .orderByHistoricActivityInstanceStartTime()
        .asc()
        .listPage(0, 20);
historicActivityInstances.forEach(System.out::println);
```

**查询历史任务**

```java
List<HistoricTaskInstance> historicTaskInstances = historyService.createHistoricTaskInstanceQuery()
        //.deploymentId("")
        //.processDefinitionId("")
        .processInstanceId("484eb8f0-ccff-11ef-8e40-986ee82ee222")
        //.taskAssignee("张三")
        .orderByTaskCreateTime()
        .asc()
        .listPage(0, 20);
historicTaskInstances.forEach(System.out::println);
```

## `ManagementService`



## `DynamicBpmnService`



## Activiti7新特性：`ProcessRuntime`和`TaskRuntime`



## UEL与流程变量

### UEL表达式语法



### 流程变量

启动流程(创建流程实例)时,设置第一个节点中定义的流程变量

```java
String processDefinitionKey = "leave";
String businessKey = "1";
String tenantId = "1";
Map<String,Object> variables = new HashMap<>();
variables.put("employee", "ZhangSan"); // 请假流程发起人
ProcessInstance processInstance = runtimeService.startProcessInstanceByKeyAndTenantId(processDefinitionKey, businessKey, variables, tenantId);
```

完成任务时, 设置下一个节点(网关或任务)中定义的流程变量

```java
// 完成任务, 设置下一个节点中定义的流程变量
String taskId = "646325bd-ddf5-11ef-8f80-986ee82ee222";
Map<String,Object> variables = new HashMap<>();
variables.put("deptManager", "LiSi"); // 部门主管
taskService.complete(taskId, variables);

// 完成任务, 设置网关节点中定义的流程变量, 以及网关之后的节点中定义的变量
String taskId = "88ea311a-ddf5-11ef-99e9-986ee82ee222";
Map<String,Object> variables = new HashMap<>();
variables.put("days", 4);
variables.put("hr", "WangWu");
taskService.complete(taskId, variables);
```

## 网关

Activiti中的网关（Gateway）是用于控制流程走向的重要组件。

### 排它网关

排它网关（Exclusive Gateway），只会选择一个为true的分支执行，适用于需要根据条件选择不同路径的场景。

排它网关必须设置执行条件。

### 并行网关

并行网关（Parallel Gateway），基于进入和外出顺序流来控制流程的分叉和合并，适用于需要并行执行多个任务的场景，例如**会签**流程。

并行网关不需要设置执行条件，即使设置了也不生效。

### 包含网关

包含网关（Inclusive Gateway），可以选择多个符合条件的分支执行，适用于需要根据多个条件选择不同路径，并且这些路径可以并行执行的场景。

包含网关必须设置执行条件。

### 事件网关

事件网关（Event-based Gateway），当某个事件触发时，选择相应的分支执行，适用于需要根据外部事件来触发流程走向的场景。

## 事件



## 监听器



## 子流程
