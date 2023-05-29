namespace ReactSignalRDemoApi.Models
{
    public class UserFiles
    {
        public long UserFilesId { get; set; }
        public long UserId { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
