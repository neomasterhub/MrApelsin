namespace DataModel;

public class ServerMessage
{
    public ServerMessageType MessageType { get; set; }
    public ContentType ContentType { get; set; }
    public string Content { get; set; }
}
