#r "Newtonsoft.Json"

#load "ApplicationInsights.csx"
#load "CustomEvent.csx"

using Microsoft.ApplicationInsights;

public static void Run(CustomEvent customEvent, TraceWriter log)
{
    var telemetryClient = ApplicationInsights.CreateTelemetryClient();
    telemetryClient.TrackEvent(customEvent.EventName, customEvent.Properties, customEvent.Metrics);
}