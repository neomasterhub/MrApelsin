namespace DataModel;

public class AuditEvent
{
    public int Id { get; set; }
    public DateTime DateTimeUtc { get; set; }
    public string Object { get; set; }
    public string Subject { get; set; }
    public string Description { get; set; }
}
