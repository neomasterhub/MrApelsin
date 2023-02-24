using DAL.Features.Audit.Services.AddAuditEvent;
using DataModel;
using HotChocolate.Subscriptions;

namespace GraphQLTransport.Schema;

public class Mutation
{
    public AuditEvent AddAuditEvent(IAddAuditEventService service, AddAuditEvent e) => service.Add(e);

    public async Task<ServerMessage> PingAsync([Service] ITopicEventSender sender)
    {
        var message = new ServerMessage
        {
            MessageType = ServerMessageType.Ping,
        };

        await sender.SendAsync(nameof(Subscription.ServerMessageReceived), message);

        return message;
    }
}
