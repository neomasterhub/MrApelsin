using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]
abstract class ApiControllerBase : ControllerBase
{
}
