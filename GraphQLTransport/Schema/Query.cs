using Common.Versioning;
using DAL;
using DataModel;
using HotChocolate.Subscriptions;
using Newtonsoft.Json;

namespace GraphQLTransport.Schema;

public class Query
{
    [UseOffsetPaging(DefaultPageSize = 30, IncludeTotalCount = true)]
    [UseSorting]
    public IQueryable<AuditEvent> GetAuditEvents(AppDbContext context) => context.AuditEvents;

    public async Task<AppVersion> GetAppVersionAsync([Service] ITopicEventSender sender)
    {
        var result = AppInfo.Info.Instance.AppVersion;
        var message = new ServerMessage
        {
            MessageType = ServerMessageType.AppVersion,
            ContentType = ContentType.Json,
            Content = JsonConvert.SerializeObject(result),
        };

        await sender.SendAsync(nameof(Subscription.ServerMessageReceived), message);

        return result;
    }
}
