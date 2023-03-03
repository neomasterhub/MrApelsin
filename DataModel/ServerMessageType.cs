namespace DataModel;

public enum ServerMessageType
{
    /// <summary>
    /// Connection test message.
    /// </summary>
    Ping = 0,

    /// <summary>
    /// Number and datetime when the solution was last rebuilt.
    /// </summary>
    AppVersion = 1,
}
