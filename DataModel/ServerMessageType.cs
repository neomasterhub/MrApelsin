namespace DataModel;

public enum ServerMessageType
{
    /// <summary>
    /// Number and datetime when the solution was last rebuilt.
    /// The first message sent when a connection is established.
    /// </summary>
    AppVersion = 0,
}
