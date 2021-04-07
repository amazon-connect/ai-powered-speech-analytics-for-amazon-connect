# Install dependencies and build jar

FROM gradle:jdk11 as build

RUN pwd 
RUN ls -altr

WORKDIR /build
COPY kvs_transcribe_streaming_lambda/src /build/src
COPY kvs_transcribe_streaming_lambda/build.gradle .
RUN gradle buildFargate --no-daemon


FROM amazoncorretto:11

WORKDIR /app

COPY --from=build /build/build/libs/build.jar /app/kvsrecord.jar

ENTRYPOINT ["java", "-jar", "/app/kvsrecord.jar"]