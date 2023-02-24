namespace DataModel;

public enum ServerMessageType
{
    /// <summary>
    /// The first message sent when a connection is established.
    /// </summary>
    Ping = 0,

    /// <summary>
    /// Number and datetime when the solution was last rebuilt.
    /// </summary>
    AppVersion = 1,
}
