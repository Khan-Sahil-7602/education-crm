# ⚠️ Configuration Required

This project does **not** include the `application.properties` file because it contains sensitive information such as database credentials, razorpay credentials etc.

Before running the backend, create the following file and the folder:

```text
backend/src/main/resources/application.properties
backend/uploads
```

Example:

```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/YOUR_DATABASE_NAME
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

razorpay.key.id=RAZORPAY_KEY
razorpay.key.secret=RAZORPAY_SECRET
```

> **Note:** The project will not start until a valid `application.properties` file is created.
