using DataModel;

namespace GraphQLTransport.Schema;

public class Subscription
{
    [Subscribe]
    public ServerMessage ServerMessageReceived([EventMessage] ServerMessage serverMessage) => serverMessage;
}
