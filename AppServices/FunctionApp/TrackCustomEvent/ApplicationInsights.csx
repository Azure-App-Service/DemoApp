#r "System.Web"

#load "Settings.csx"

using Microsoft.ApplicationInsights;
using System.Reflection;
using System.Web.Hosting;

// Class used to custom events to Application Insights.
public static class ApplicationInsights
{
    public static TelemetryClient CreateTelemetryClient()
    {
        var telemetryClient = new TelemetryClient();
        telemetryClient.InstrumentationKey = Settings.ApplicationInsightsInstrumentationKey;
        return telemetryClient;
    }
}

public enum OperationStatus
{
    Failure = 0,
    Success = 1,
}

public static void TrackStatus(this TelemetryClient client, string functionName, string correlationId, string description, OperationStatus? operationResult = null)
{
    var properties = GetCommonProperties("Status Log", functionName, correlationId);
    properties["Description"] = description;
    if (operationResult.HasValue)
        properties["Status"] = operationResult.ToString();
    var metrics = new Dictionary<string, double> { { "Azure Function", 0 } };
    client.TrackEvent("Azure Function Status", properties, metrics);
}

public static void TrackStatus(this TelemetryClient client, string functionName, string correlationId, string description, bool isSuccess)
{
    var operationResult = isSuccess ? OperationStatus.Success : OperationStatus.Failure;
    TrackStatus(client, functionName, correlationId, description, operationResult);
}

public static void TrackException(this TelemetryClient client, string functionName, string correlationId, Exception ex)
{
    var properties = GetCommonProperties("Error Log", functionName, correlationId);
    properties["LogName"] = "Azure Function Status";
    client.TrackException(ex, properties);
}

private static Dictionary<string, string> GetCommonProperties(string logType, string functionName, string correlationId)
{
    return new Dictionary<string, string>()
    {
        { "LogType", logType},
        { "FunctionName", functionName },
        { "Host",  HostingEnvironment.ApplicationHost.GetSiteName() },
        { "CorrelationId", correlationId },
        { "Version", Assembly.GetExecutingAssembly().GetName().Version.ToString() },
        { "FunctionsExtensionVersion", Settings.FunctionsExtensionVersion }
    };
}