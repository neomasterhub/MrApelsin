using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]
internal abstract class ApiControllerBase : ControllerBase
{
}
