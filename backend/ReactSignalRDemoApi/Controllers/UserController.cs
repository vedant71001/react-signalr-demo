using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactSignalRDemoApi.Models;
using System.Data;
using System.Data.SqlClient;

namespace ReactSignalRDemoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(LoginModel loginModel)
        {
            try
            {
                string query = $"SELECT TOP(1) * FROM [User] WHERE email = '{loginModel.Email}' AND password='{loginModel.Password}'";
                SqlConnection con = new(_configuration.GetConnectionString("DefaultConnection"));
                SqlCommand cmd = new(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new();
                da.Fill(dt);
                if(dt.Rows.Count == 0)
                {
                    return Content("invalidUser");
                }

                User user = new User();
                user.UserId = Convert.ToInt64(dt.Rows[0]["user_id"]);
                user.FirstName = dt.Rows[0]["first_name"].ToString() ?? "";
                user.LastName = dt.Rows[0]["last_name"].ToString() ?? "";
                user.Email = dt.Rows[0]["email"].ToString() ?? "";

                return new JsonResult(new
                {
                    userId = user.UserId,
                    firstname = user.FirstName,
                    lastname = user.LastName,
                    email = user.Email,
                    password = user.Password
                });
            }
            catch (Exception ex)
            {
                return Content("Error: " + ex);
            }
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Regsiter(User user)
        {
            try
            {
                string insertQuery = $"INSERT INTO [User](first_name, last_name, email, password) VALUES('{user.FirstName}', '{user.LastName}','{user.Email}','{user.Password}')";
                SqlConnection con = new(_configuration.GetConnectionString("DefaultConnection"));
                SqlCommand cmd = new(insertQuery, con);
                con.Open();
                cmd.ExecuteNonQuery();
                cmd.CommandText = "select IDENT_CURRENT('User') as [latest id]";
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new();
                da.Fill(dt);
                user.UserId = Convert.ToInt64(dt.Rows[0]["latest id"]);
                con.Close();
                return new JsonResult(user);
            }
            catch (Exception ex)
            {
                return Content("Error: " + ex);
            }
        }
    }
}
