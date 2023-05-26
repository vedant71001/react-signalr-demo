using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ReactSignalRDemoApi.Hubs;
using ReactSignalRDemoApi.Models;

namespace ReactSignalRDemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _chatHub;

        public ChatController(IHubContext<ChatHub> chatHub)
        {
            _chatHub = chatHub;
        }

        [HttpPost]
        [Route("SendMessage")]
        public async Task<ContentResult> SendMessage(ChatMessages message)
        {
            try
            {
                await _chatHub.Clients.All.SendAsync("ChatToAll", message);
                return Content("Message Sent Successfully");
            }
            catch (Exception ex)
            {
                return Content("Error: " + ex);
            }
        }

        [HttpPost]
        [Route("SendAudio")]
        public async Task<ContentResult> SendAudio(AudioMessage audio)
        {
            try
            {
                await _chatHub.Clients.All.SendAsync("SendAudio", audio);
                return Content("Audio Sent Successfully");
            }
            catch (Exception ex)
            {
                return Content("Error: " + ex);
            }
        }
    }
}
