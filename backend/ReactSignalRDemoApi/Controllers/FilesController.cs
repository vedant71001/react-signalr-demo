using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactSignalRDemoApi.Models;
using System.Data;
using System.Data.SqlClient;

namespace ReactSignalRDemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IConfiguration _configuration;

        public FilesController(IWebHostEnvironment hostEnvironment, IConfiguration configuration)
        {
            _hostEnvironment = hostEnvironment;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetUserFiles")]
        public List<UserFiles> GetUserFiles(long userId)
        {
            List<UserFiles> userFiles = new List<UserFiles>();
            string query = $"SELECT * FROM [UserFiles] WHERE [user_id]={userId} and is_deleted=0";
            SqlConnection con = new(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new(query, con);
            SqlDataAdapter da = new(cmd);
            DataTable dt = new();
            da.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                UserFiles file = new UserFiles();
                file.UserFilesId = Convert.ToInt64(dt.Rows[i]["user_file_id"]);
                file.UserId = userId;
                file.FileName = dt.Rows[i]["file_name"].ToString();
                file.FilePath = dt.Rows[i]["file_path"].ToString();
                file.IsDeleted = Convert.ToBoolean(dt.Rows[i]["is_deleted"]);
                file.UploadedAt = Convert.ToDateTime(dt.Rows[i]["uploded_at"]);
                userFiles.Add(file);
            }

            return userFiles.OrderByDescending(file => file.UploadedAt).ToList();
        }

        [HttpPost]
        [Route("UploadFile")]
        public IActionResult UploadFile(long UserId, IFormFile File)
        {
            try
            {
                if (File == null)
                {
                    throw new ArgumentNullException(nameof(File));
                }
                string rootPath = _hostEnvironment.WebRootPath;
                string fileName = $"userId-{UserId}-file-{DateTime.Now.ToString("ddMMyyyyhhmmssfff")}";
                string filepath = Path.Combine(rootPath, "Files");
                string extension = Path.GetExtension(File.FileName);
                using (FileStream fileStream = new(Path.Combine(filepath, fileName + extension), FileMode.Create))
                {
                    File.CopyTo(fileStream);
                }

                string insertQuery = $"INSERT INTO [UserFiles]([user_id],[file_name],[file_path],[uploded_at])" +
                    $"VALUES ({UserId},'{File.FileName}','/Files/{fileName+extension}','{DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss")}')";

                SqlConnection con = new(_configuration.GetConnectionString("DefaultConnection"));
                SqlCommand cmd = new(insertQuery, con);
                con.Open();
                cmd.ExecuteNonQuery();

                cmd.CommandText = $"SELECT * FROM [UserFiles] WHERE [user_file_id] = IDENT_CURRENT('UserFiles') AND [user_id] = {UserId}";
                SqlDataAdapter da = new(cmd);
                DataTable dt = new();
                da.Fill(dt);

                if(dt.Rows.Count == 0)
                {
                    return BadRequest();
                }

                UserFiles file = new UserFiles()
                {
                    UserFilesId = Convert.ToInt64(dt.Rows[0]["user_file_id"]),
                    UserId = UserId,
                    FileName = dt.Rows[0]["file_name"].ToString(),
                    FilePath = dt.Rows[0]["file_path"].ToString(),
                    IsDeleted = Convert.ToBoolean(dt.Rows[0]["is_deleted"]),
                    UploadedAt = Convert.ToDateTime(dt.Rows[0]["uploded_at"])
                };

                con.Close();
                return new JsonResult(file);

            }
            catch (Exception ex)
            {
                return Content("Error: " + ex);
            }
        }

        [HttpPost]
        [Route("DeleteFile")]
        public bool DeleteFile(long userFileId)
        {
            try
            {
                if(userFileId == 0)
                {
                    return false;
                }
                string query = $"Update [UserFiles] Set is_deleted=1 where [user_file_id]={userFileId}";
                SqlConnection con = new(_configuration.GetConnectionString("DefaultConnection"));
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                cmd.ExecuteNonQuery();
                cmd.CommandText = $"SELECT [file_path] FROM [UserFiles] WHERE [user_file_id] = {userFileId}";
                SqlDataAdapter da = new(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                string? path = dt.Rows[0]["file_path"].ToString();
                if(path == null)
                {
                    return false;
                }
                FileInfo file = new FileInfo(_hostEnvironment.WebRootPath + path);
                if (file.Exists)
                {
                    file.Delete();
                }
                con.Close();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpGet]
        [Route("DownloadFile")]
        public IActionResult DownloadFile(string filePath)
        {
            string wwwRootPath = _hostEnvironment.WebRootPath;
            var dataBytes = System.IO.File.ReadAllBytes(wwwRootPath+filePath);

            var extension = Path.GetExtension(filePath).Split('.')[1];
            var contentType = "";
            if(extension == "png")
            {
                contentType = "image/png";
            }
            else if(extension == "jpg")
            {
                contentType = "image/jpg";
            }
            else
            {
                contentType = "application/*";
            }
            return new FileContentResult(dataBytes, contentType);
            //return File(filePath,contentType);
        }
    }
}
