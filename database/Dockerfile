FROM alpine:latest

ARG PB_VERSION=0.22.21
ARG PB_ADMIN_PASSWORD

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY ./migrations /pb/pb_migrations
COPY ./hooks /pb/pb_hooks

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENV PB_ADMIN_PASSWORD=${PB_ADMIN_PASSWORD}
ENTRYPOINT ["/entrypoint.sh"]
