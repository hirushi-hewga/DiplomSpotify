using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.BLL.Services;

namespace SpotifyAPI.Controllers
{
    public class AppController : ControllerBase
    {
        protected IActionResult CreateActionResult(ServiceResponse responce)
        {
            return responce.IsSuccess ? Ok(responce) : BadRequest(responce);
        }
        protected bool ValidateId(string? id, out string message)
        {
            if (string.IsNullOrEmpty(id))
            {
                message = "Id is empty";
                return false;
            }
            
            if (!Guid.TryParse(id, out var value))
            {
                message = "Incorrect id format";
                return false;
            }
        
            message = "Id correct";
            return true;
        }
    }
}