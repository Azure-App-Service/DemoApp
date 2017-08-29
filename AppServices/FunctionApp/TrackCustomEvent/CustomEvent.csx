public class CustomEvent
{
    public string EventName { get; set; }

    public Dictionary<string, string> Properties { get; set; }

    public Dictionary<string, double> Metrics { get; set; }
}