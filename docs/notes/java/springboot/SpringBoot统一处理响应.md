---
title: SpringBoot统一处理响应
createTime: 2024/11/24 15:56:15
permalink: /notes/java/7zyb1vjj/
---
# SpringBoot统一处理响应

## 定义API接口响应数据结构

定义枚举类，声明常用状态码以及消息

```java
@Getter
public enum ApiStatus {
    SUCCESS(200, "成功"),
    BAD_REQUEST(400, "请求参数错误"),
    UNAUTHORIZED(401, "未授权"),
    FORBIDDEN(403, "禁止访问"),
    NOT_FOUND(404, "资源未找到"),
    INTERNAL_SERVER_ERROR(500, "内部服务器错误");

    private final int code;
    private final String message;

    ApiStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
```

定义统一响应数据结构

```java
@Getter
@Setter
public class ApiResponse<T> implements Serializable {
    private final int code;
    private final String message;
    private final T data;
    private final long timestamp;

    public ApiResponse(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(ApiStatus.SUCCESS.getCode(), ApiStatus.SUCCESS.getMessage(), data);
    }

    public static ApiResponse<Void> error(int code, String message){
        return new ApiResponse<>(code, message, null);
    }

    public static ApiResponse<Void> error(ApiStatus apiStatus) {
        return error(apiStatus.getCode(), apiStatus.getMessage());
    }
}
```

## 使用`ResponseBodyAdvice`自动封装统一的响应数据结构

定义一个注解，用于标记是否开启自动返回统一响应数据格式的功能。使用时，只需要在类、方法上使用注解即可

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface EnableApiResponse {
    boolean value() default true;
}
```

定义类，实现`ResponseBodyAdvice`接口，并使用`@RestControllerAdvice`注解

```java
@RestControllerAdvice(basePackages = {"me.lyp.ecommerce"})
@SuppressWarnings("all")
public class CustomResponseBodyAdvice implements ResponseBodyAdvice<Object> {

    private final ObjectMapper objectMapper;

    @Autowired
    public CustomResponseBodyAdvice(ObjectMapper objectMapper){
        this.objectMapper = objectMapper;
    }

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        Method method = returnType.getMethod();
        if(method.isAnnotationPresent(EnableApiResponse.class)) {
            EnableApiResponse annotation = method.getAnnotation(EnableApiResponse.class);
            return annotation.value();
        }

        Class<?> declaringClass = returnType.getDeclaringClass();
        if(declaringClass.isAnnotationPresent(EnableApiResponse.class)) {
            EnableApiResponse annotation = declaringClass.getAnnotation(EnableApiResponse.class);
            return annotation.value();
        }
        return false;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
            Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request,
            ServerHttpResponse response) {
        // 返回值类型为void
        if("void".equalsIgnoreCase(returnType.getParameterType().getName())){
            return body;
        }

        // 返回值类型为String
        if(returnType.getParameterType().isAssignableFrom(String.class)){
            try {
                return objectMapper.writeValueAsString(ApiResponse.ok(body));
            } catch(JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        if(body instanceof ApiResponse){
            return body;
        }
        
        return ApiResponse.ok(body);
    }
}
```

## 统一处理异常

自定义业务异常

```java
@Getter
public class BusinessException extends RuntimeException {
    private final int code;

    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }
}
```

定义全局异常处理器，使用`@RestControllerAdvice`注解

```java
@RestControllerAdvice(basePackages = {"me.ian.blog.controller"})
public class GlobalExceptionHandlerAdvice {

    @ExceptionHandler(value = {Throwable.class})
    public ApiResponse<String> handleException(HttpServletRequest req, HttpServletResponse resp, Throwable throwable) {
        // 参数绑定、校验异常
        if(throwable instanceof MissingServletRequestParameterException ex) {
            return ApiResponse.error(400, String.format("缺少请求参数%s", ex.getParameterName()));
        }
        if(throwable instanceof BindException ex) {
            return ApiResponse.error(400, ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
        }
        if(throwable instanceof ValidationException ex) {
            return ApiResponse.error(400, ex.getMessage());
        }
        // 处理业务异常
        if (throwable instanceof BusinessException ex){
            return ApiResponse.error(ex.getCode(), ex.getMessage());
        }
        // 处理其它异常
        String message = throwable.getMessage();
        if (message == null || message.trim().isBlank()){
            message = "未知错误";
        }
        return ApiResponse.error(0, message);
    }
}
```

