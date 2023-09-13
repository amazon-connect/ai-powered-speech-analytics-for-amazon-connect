# Install dependencies and build jar

FROM public.ecr.aws/docker/library/gradle:6.8.3-jdk11 as build

RUN pwd 
RUN ls -altr

WORKDIR /build
COPY kvs_transcribe_streaming_lambda/src /build/src
COPY kvs_transcribe_streaming_lambda/build.gradle .
RUN gradle buildFargate --no-daemon


FROM public.ecr.aws/amazoncorretto/amazoncorretto:11

WORKDIR /app

COPY --from=build /build/build/libs/build.jar /app/kvsrecord.jar

ENTRYPOINT ["java", "-jar", "/app/kvsrecord.jar"]
