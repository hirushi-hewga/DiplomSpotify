namespace SpotifyAPI.BLL.Services
{
    public class ServiceResponse
    {
        public ServiceResponse() { }
        public ServiceResponse(string message, bool isSuccess = false, object? payload = null)
        {
            IsSuccess = isSuccess;
            Message = message;
            Payload = payload;
        }

        public bool IsSuccess { get; set; } = false;
        public string Message { get; set; } = string.Empty;
        public object? Payload { get; set; }
    }
}