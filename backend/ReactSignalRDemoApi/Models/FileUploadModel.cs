namespace ReactSignalRDemoApi.Models
{
    public class FileUploadModel
    {
        public long UserId { get; set; }
        public IFormFile File { get; set; }
    }
}
