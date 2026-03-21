FROM golang:1.24-alpine as builder
RUN addgroup -S appgroup --gid 1001 && adduser -S appuser --uid 1001 -G appgroup
RUN mkdir /build
WORKDIR /build
COPY . .
RUN go build -o main

FROM alpine:3.21
COPY --from=builder /build/main .
COPY --from=builder /etc/passwd /etc/passwd
USER appuser
ENTRYPOINT [ "./main" ]