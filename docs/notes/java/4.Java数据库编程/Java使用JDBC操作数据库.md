---
title: Java使用JDBC操作数据库
createTime: 2024/11/24 15:56:15
permalink: /notes/java/qsyhaeqk/
---

## JDBC入门示例

```java
private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
private static final String JDBC_URL = "jdbc:mysql://192.168.95.129:3306/test";
private static final String JDBC_USERNAME = "root";
private static final String JDBC_PASSWORD = "root";

public static void main(String[] args) {
    Connection conn = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
        // 1.注册驱动
        Class.forName(JDBC_DRIVER);
        // 2.打开连接
        conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);
        // 3.执行sql
        statement = conn.createStatement();
        String sql = "select * from t_user";
        resultSet = statement.executeQuery(sql);
        // 4.处理结果集
        while (resultSet.next()) {
            String id = resultSet.getString("id");
            String name = resultSet.getString("username");
            String password = resultSet.getString("password");
            int age = resultSet.getInt("age");
            String gender = resultSet.getString("gender");
            String phoneNumber = resultSet.getString("phoneNumber");
            int locked = resultSet.getInt("locked");
            Timestamp createTime = resultSet.getTimestamp("create_time");
            String creatorId = resultSet.getString("creator_id");
            Timestamp updateTime = resultSet.getTimestamp("update_time");
            String updaterId = resultSet.getString("updater_id");

            System.out.println(id + "\t" + name + "\t" + password + "\t" + age + "\t" + gender + "\t" + phoneNumber + "\t" + locked + "\t" + createTime + "\t" + creatorId + "\t" + updateTime + "\t" + updaterId);
        }

    } catch (ClassNotFoundException | SQLException e) {
        throw new RuntimeException(e);
    } finally {
        System.out.println("执行完毕");
        // 5.关闭连接
        try {
            if (resultSet != null) {
                resultSet.close();
            }
            if (statement != null) {
                statement.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

```

## JDBC依赖

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.7.4</version>
</dependency>
<dependency>
    <groupId>com.oracle.database.jdbc</groupId>
    <artifactId>ojdbc10</artifactId>
    <version>19.23.0.0</version>
</dependency>
<dependency>
    <groupId>org.xerial</groupId>
    <artifactId>sqlite-jdbc</artifactId>
    <version>3.42.0.0</version>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>2.2.224</version>
</dependency>
```

## `Driver`与`DriverManager`

### 驱动

MySQL：`com.mysql.jdbc.Driver` 

MySQL 8.0以上版本：`com.mysql.cj.jdbc.Driver`

PostgreSQL：`org.postgresql.Driver`

Oracle：`oracle.jdbc.driver.OracleDriver`

### 驱动管理器

`DriverManager`用于加载和注册JDBC驱动程序，并建立与数据库的连接（静态方法`getConnection`）。

数据库连接URL格式如下：

- MySQL：`jdbc:mysql://192.168.95.129:3306/test?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&serverTimezone=Aisa/Shanghai`

- PostgreSQL：`jdbc:postgresql://192.168.95.129:5432/postgres?currentSchema=test&characterEncoding=utf8`

- Oracle使用SID：`jdbc:oracle:thin:@localhost:1521:xe`

- Oracle使用服务名：`jdbc:oracle:thin:@//localhost:1521/orclpdb`

## `Connection`



## `Statement` 和 `PreparedStatement`



## `ResultSet`
