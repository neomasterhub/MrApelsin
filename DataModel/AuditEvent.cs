namespace DataModel;

public class AuditEvent
{
    public int Id { get; set; }
    public DateTime DateTimeUtc { get; set; }
    public string Url { get; set; }
    public string Subject { get; set; }
    public string Description { get; set; }
}
