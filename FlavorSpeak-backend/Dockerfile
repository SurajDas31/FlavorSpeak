FROM openjdk:8u171-alpine

WORKDIR /app

COPY /target/FlavorSpeak-backend-1.0.jar FlavorSpeak-backend-1.0.jar
COPY /src/main/resources/application-prod.properties application-prod.properties

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "FlavorSpeak-backend-1.0.jar", "--spring.config.location=./application-prod.properties" ]
