using Common.Versioning;
using DAL;
using DataModel;
using HotChocolate.Subscriptions;

namespace GraphQLTransport.Schema;

public class Query
{
    [UseOffsetPaging(DefaultPageSize = 30, IncludeTotalCount = true)]
    [UseSorting]
    public IQueryable<AuditEvent> GetAuditEvents(AppDbContext context) => context.AuditEvents;

    public async Task<AppVersion> GetAppVersion([Service] ITopicEventSender sender)
    {
        var result = AppInfo.Info.Instance.AppVersion;
        var message = new ServerMessage
        {
            MessageType = ServerMessageType.AppVersion,
            Text = result.ToString(),
        };

        await sender.SendAsync(nameof(Subscription.ServerMessageReceived), message);

        return result;
    }
}
