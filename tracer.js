'use strict';
const opentelemetry = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');


// Create and configure NodeTracerProvider
const provider = new NodeTracerProvider({
  plugins: {
    http: {
      enabled: true,
      // You may use a package name or absolute path to the file.
      path: '@opentelemetry/plugin-http',
      // http plugin options
    },
    express: {
      enabled: true,
      path: '@opentelemetry/plugin-express'
    }
  }
});

provider.register();

let exporter = new JaegerExporter({
    serviceName: 'front-end'
})

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));